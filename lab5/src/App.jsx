import{ useState } from "react";
import Grid from "./components/Grid";
import Palette from "./components/Palette";
import Gallery from "./components/Gallery";
import culoriData from "./data/culori.json";

function App() {
  const N = 20;
  const emptyGrid = Array.from({ length: N }, () => Array(N).fill("#fff"));

  const [grid, setGrid] = useState(emptyGrid);
  const [currentColor, setCurrentColor] = useState(culoriData[0]);
  const [drawings, setDrawings] = useState([]);

  const handleCellPaint = (i, j) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cellColor, colIndex) =>
        rowIndex === i && colIndex === j ? currentColor : cellColor
      )
    );
    setGrid(newGrid);
  };

  const resetGrid = () => setGrid(emptyGrid);

  const saveDrawing = () => setDrawings([...drawings, grid]);

  const loadDrawing = (idx) => setGrid(drawings[idx]);

  const deleteDrawing = (idx) => {
    const newDrawings = drawings.filter((_, i) => i !== idx);
    setDrawings(newDrawings);
  };

return (
  <div style={{ padding: "20px" }}>
    <h1>Pixel Art App</h1>
    
    <div id="palette-container">
      <Palette
        colors={culoriData}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      />
    </div>

    <div style={{ textAlign: "center", marginBottom: "10px" }}>
      <button onClick={resetGrid}>Reset</button>
      <button onClick={saveDrawing}>Save</button>
    </div>

    <div id="grid-container">
      <Grid grid={grid} onCellPaint={handleCellPaint} />
    </div>

    <div id="gallery-container">
      <Gallery drawings={drawings} loadDrawing={loadDrawing} deleteDrawing={deleteDrawing} />
    </div>
  </div>
);
}

export default App