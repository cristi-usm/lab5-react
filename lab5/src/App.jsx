import { useState } from "react"
import colors from "./data/colors.json"
import Canvas from "./components/Canvas"
import ColorPalette from "./components/ColorPalette"
import Toolbar from "./components/Toolbar"
import Gallery from "./components/Gallery"
import "./App.css"

const GRID_SIZE = 20

function createEmptyGrid(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => "#FFFFFF")
  )
}

export default function App() {
  const [grid, setGrid] = useState(createEmptyGrid(GRID_SIZE))
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [gallery, setGallery] = useState([])

  const paintCell = (rowIndex, colIndex) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row])
      newGrid[rowIndex][colIndex] = selectedColor
      return newGrid
    })
  }

  const handleCellMouseDown = (rowIndex, colIndex) => {
    setIsMouseDown(true)
    paintCell(rowIndex, colIndex)
  }

  const handleCellMouseEnter = (rowIndex, colIndex) => {
    if (!isMouseDown) return
    paintCell(rowIndex, colIndex)
  }

  const handleMouseUpAnywhere = () => {
    setIsMouseDown(false)
  }

  const resetCanvas = () => {
    setGrid(createEmptyGrid(GRID_SIZE))
  }

  const saveDrawing = () => {
    const newDrawing = {
      id: Date.now(),
      pixels: grid.map((row) => [...row])
    }

    setGallery((prevGallery) => [newDrawing, ...prevGallery])
  }

  const loadDrawing = (drawingId) => {
    const selectedDrawing = gallery.find((item) => item.id === drawingId)

    if (!selectedDrawing) return

    setGrid(selectedDrawing.pixels.map((row) => [...row]))
  }

  const deleteDrawing = (drawingId) => {
    setGallery((prevGallery) =>
      prevGallery.filter((item) => item.id !== drawingId)
    )
  }

  return (
    <div className="app" onMouseUp={handleMouseUpAnywhere}>
      <header className="app-header">
        <h1>Pixel Art App</h1>
      </header>

      <div className="main-layout">
        <section className="left-panel">

          <div className="card">
            <h2>Color palette</h2>

            <ColorPalette
              colors={colors}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </div>

          <div className="card">
            <h2>Tools</h2>

            <Toolbar
              onReset={resetCanvas}
              onSave={saveDrawing}
            />
          </div>

          <div className="card">
            <h2>Gallery</h2>

            <p className="gallery-count">
              Total drawings saved: <strong>{gallery.length}</strong>
            </p>

            <Gallery
              gallery={gallery}
              onLoad={loadDrawing}
              onDelete={deleteDrawing}
            />
          </div>

        </section>

        <section className="right-panel">

          <div className="card canvas-card">
            <Canvas
              grid={grid}
              onCellMouseDown={handleCellMouseDown}
              onCellMouseEnter={handleCellMouseEnter}
            />
          </div>

        </section>
      </div>
    </div>
  )
}