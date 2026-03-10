import { useState } from "react";
import Grid from "./components/Grid";
import ColorPalette from "./components/ColorPalette";
import Gallery from "./components/Gallery";
import "./App.css";

function App() {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [currentGrid, setCurrentGrid] = useState(null);
  const [savedDrawings, setSavedDrawings] = useState([]);
  const [loadedGrid, setLoadedGrid] = useState(null);

  const handleSave = () => {
    if (!currentGrid) return;
    setSavedDrawings((prev) => [
      ...prev,
      { id: Date.now(), grid: currentGrid.map((r) => [...r]) },
    ]);
  };

  const handleLoad = (grid) => {
    setLoadedGrid(grid.map((r) => [...r]));
  };

  const handleDelete = (id) => {
    setSavedDrawings((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">Pixel Art</h1>
      <ColorPalette
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <button className="saveButton" onClick={handleSave}>
        Save
      </button>
      <Grid
        selectedColor={selectedColor}
        onGridChange={setCurrentGrid}
        loadedGrid={loadedGrid}
      />
      <Gallery
        savedDrawings={savedDrawings}
        onLoad={handleLoad}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
