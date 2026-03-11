import "./App.css";
import { useState } from "react";
import { CanvasGrid } from "@components/CanvasGrid";
import { ColorPallete } from "@components/CollorPallete";
import { SaveDrawing } from "@components/saveDrawing";
import colorsData from "@data/colors.json";

function App() {
  const [gridData, setGridData] = useState(Array(400).fill(null));
  const [selectedColor, setSelectedColor] = useState(null);
  const [savedArr, setSavedArr] = useState([]);
  function handleSquareClick(index) {
    if (selectedColor === null) {
      return;
    } else {
      const nextGrid = [...gridData];
      nextGrid[index] = selectedColor;
      setGridData(nextGrid);
    }
  }
  function saveDrawing() {
    const nextDrawingArr = [...savedArr, [...gridData]];
    setSavedArr(nextDrawingArr);
  }
  function handleLoadClick(index) {
    const selectedDrawing = [...savedArr];
    setGridData(selectedDrawing[index]);
  }
  function handleDeleteClick(index) {
    const drawingArr = [...savedArr];
    setSavedArr(drawingArr.filter((_, i) => i !== index));
  }
  return (
    <div className="main_container">
      <h1>Pixel Draw</h1>
      <ColorPallete
        colorsArr={colorsData}
        onColorSelect={(colorCode) => setSelectedColor(colorCode)}
        selectedColor={selectedColor}
        onReset={() => setGridData(Array(400).fill(null))}
        onSave={() => saveDrawing()}
      ></ColorPallete>
      <CanvasGrid
        gridData={gridData}
        onSquareClick={(index) => handleSquareClick(index)}
      ></CanvasGrid>
      <SaveDrawing
        dataArr={savedArr}
        onLoad={(index) => handleLoadClick(index)}
        onDelete={(index) => handleDeleteClick(index)}
      ></SaveDrawing>
    </div>
  );
}

export default App;
