import { useEffect, useState } from "react";
import colors from "./assets/colors.json";

import ColorPalette from "./Components/ColorPalette/colorPalette";
import Toolbar from "./Components/Toolbar/toolbar";
import CanvasGrid from "./Components/CanvasGrid/canvasGrid";
import Gallery from "./Components/Gallery/gallery";

import "./App.css";

const GRID_SIZE = 20;
const STORAGE_KEY = "pixel_gallery";

function createEmptyGrid(size) {
  return Array(size * size).fill("#ffffff");
}

function App() {
  const [grid, setGrid] = useState(createEmptyGrid(GRID_SIZE));
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isPainting, setIsPainting] = useState(false);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setGallery(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gallery));
  }, [gallery]);

  const paintCell = (index) => {
    setGrid((prev) => {
      const newGrid = [...prev];
      newGrid[index] = selectedColor;
      return newGrid;
    });
  };

  const handleMouseDown = (index) => {
    setIsPainting(true);
    paintCell(index);
  };

  const handleMouseEnter = (index) => {
    if (isPainting) paintCell(index);
  };

  const handleStopPainting = () => setIsPainting(false);

  const resetGrid = () => setGrid(createEmptyGrid(GRID_SIZE));

  const saveDrawing = () => {
    const drawing = {
      id: Date.now(),
      pixels: grid,
    };

    setGallery([drawing, ...gallery]);
  };

  const loadDrawing = (drawing) => setGrid(drawing.pixels);

  const deleteDrawing = (id) =>
    setGallery(gallery.filter((d) => d.id !== id));

  return (
    <div className="app">
      <h1>Pixel Drawer</h1>

      <div className="top">
        <ColorPalette
          colors={colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />

        <Toolbar onReset={resetGrid} onSave={saveDrawing} />
      </div>

      <CanvasGrid
        grid={grid}
        gridSize={GRID_SIZE}
        onCellMouseDown={handleMouseDown}
        onCellMouseEnter={handleMouseEnter}
        onStopPainting={handleStopPainting}
      />

      <Gallery
        drawings={gallery}
        onLoad={loadDrawing}
        onDelete={deleteDrawing}
        totalSaved={gallery.length}
        gridSize={GRID_SIZE}
      />
    </div>
  );
}

export default App;