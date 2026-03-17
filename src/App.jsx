import { useState } from "react";
import palette from "./data/colors.json";
import styles from "./App.module.css";
import Palette from "./components/Pallete/Pallete.jsx";
import Controls from "./components/Controls/Controls.jsx";
import Grid from "./components/Grid/Grid.jsx";
import Gallery from "./components/Gallery/Gallery.jsx";

const gridSize = 20;

const cloneGrid = (grid) => grid.map((row) => [...row]);

function App() {
  const [grid, setGrid] = useState(
    Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => null),
    ),
  );
  const [selectedColor, setSelectedColor] = useState(palette[0].hex);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [savedDrawings, setSavedDrawings] = useState([]);

  const isCanvasBlank = !grid.some((row) => row.some((cell) => cell !== null));

  const paintCell = (rowIndex, cellIndex) => {
    setGrid((currentGrid) =>
      currentGrid.map((row, currentRowIndex) =>
        currentRowIndex === rowIndex
          ? row.map((cell, currentCellIndex) =>
              currentCellIndex === cellIndex ? selectedColor : cell,
            )
          : row,
      ),
    );
  };

  const handleCellMouseDown = (rowIndex, cellIndex) => {
    setIsMouseDown(true);
    paintCell(rowIndex, cellIndex);
  };

  const handleCellMouseEnter = (rowIndex, cellIndex) => {
    if (!isMouseDown) {
      return;
    }

    paintCell(rowIndex, cellIndex);
  };

  const stopPainting = () => {
    setIsMouseDown(false);
  };

  const resetGrid = () => {
    setGrid(
      Array.from({ length: gridSize }, () =>
        Array.from({ length: gridSize }, () => null),
      ),
    );
    setIsMouseDown(false);
  };

  const saveDrawing = () => {
    const drawing = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: `Drawing ${savedDrawings.length + 1}`,
      pixels: cloneGrid(grid),
    };

    setSavedDrawings((currentDrawings) => [drawing, ...currentDrawings]);
  };

  const loadDrawing = (pixels) => {
    setGrid(cloneGrid(pixels));
    setIsMouseDown(false);
  };

  const deleteDrawing = (drawingId) => {
    setSavedDrawings((currentDrawings) =>
      currentDrawings.filter((drawing) => drawing.id !== drawingId),
    );
  };

  return (
    <div
      className={styles.appShell}
      onMouseUp={stopPainting}
      onMouseLeave={stopPainting}
    >
      <div className={styles.hero}>
        <h1>Pixel Draw</h1>
      </div>

      <div className={styles.toolbar}>
        <Palette
          colors={palette}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />

        <Controls
          onReset={resetGrid}
          onSave={saveDrawing}
          isSaveDisabled={isCanvasBlank}
        />
      </div>

      <main className={styles.workspace}>
        <div className={styles.editorPanel}>
          <Grid
            grid={grid}
            onCellMouseDown={handleCellMouseDown}
            onCellMouseEnter={handleCellMouseEnter}
            onStopPainting={stopPainting}
          />
        </div>

        <div className={styles.sidebar}>
          <Gallery
            drawings={savedDrawings}
            onLoadDrawing={loadDrawing}
            onDeleteDrawing={deleteDrawing}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
