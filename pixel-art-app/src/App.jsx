import { useState } from 'react';
import colors from './data/colors.json';
import Grid from './components/Grid';
import "./index.css";
import Paleta from './components/Paleta';
import Gallery from './components/Gallery';

const size = 20

const createGrid = () => {
  return Array(size * size).fill("#ffffff")
}



function App() {
  const [grid, setGrid] = useState(createGrid())
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [gallery, setGallery] = useState([])

  const resetGrid = () => {
    setGrid(createGrid())
  }
  const saveDrawing = () => {
    setGallery([...gallery, grid])
  }

  const loadDrawing = (drawing) => {
    setGrid(drawing)
  }
  const deleteDrawing = (index) => {
    const newGallery = gallery.filter((_, i) => i !== index)
    setGallery(newGallery)
  }
 return (
  <div className="appContainer">

    <div className="mainLayout">

      <div className="drawingArea">

        <Paleta
          colors={colors}
          setSelectedColor={setSelectedColor}
          selectedColor={selectedColor}
        />

        <Grid
          grid={grid}
          setGrid={setGrid}
          selectedColor={selectedColor}
        />

        <div className="controls">
          <button onClick={resetGrid}>Reset</button>
          <button onClick={saveDrawing}>Save</button>
        </div>

      </div>

      <Gallery
        gallery={gallery}
        loadDrawing={loadDrawing}
        deleteDrawing={deleteDrawing}
      />

    </div>

  </div>
)
}

export default App
