import { useState } from "react"
import colors from "./data/colors.json"
import { ColorPalette } from "./components/ColorPalette/ColorPalette"
import {PixelGrid} from "./components/PixelGrid/PixelGrid"
import {Gallery} from "./components/Gallery/Gallery"
import "./App.css"

function App() {
 function createEmptyGrid(size){
    return Array(size).fill(null).map(
      () => Array(size).fill(null)
    )
  }

  const [grid, setGrid] = useState(() => createEmptyGrid(20))
  const [selectedColor, setSelectedColor] = useState(colors[0].hex)
  const [isDrawing, setIsDrawing] = useState(false)
  const [savedDrawings, setSavedDrawings] = useState([])

 function handlePaint(row, col){

    if(isDrawing){
      const newGrid = grid.map(row => [...row])
      newGrid[row][col] = selectedColor
      setGrid(newGrid)
    }
 }

 function handleMouseDown(row, col){
  setIsDrawing(true)
  const newGrid = grid.map(row => [...row])
  newGrid[row][col] = selectedColor
  setGrid(newGrid)
 }

 function handleMouseUp(){
  setIsDrawing(false)
 }

 function handleReset(){
    setGrid(createEmptyGrid(20))
 }

 function handleSave(){
  const newDrawing = {"id": Date.now(), "grid": grid.map(g => [...g]) }
  setSavedDrawings([...savedDrawings, newDrawing])
 }

 function handleLoad(drawing){
    setGrid(drawing.grid.map(dg => [...dg]))
 }

 function handleDelete(id){
  setSavedDrawings(savedDrawings =>  savedDrawings.filter(sd => sd.id !== id))
 }



  return (
    <div className="app" onMouseUp={handleMouseUp}>
      <h1>Pixel Art :)</h1>

     <div className="toolbar">
        <ColorPalette 
          colors={colors}
          selectedColor={selectedColor}
          onSelecterColor={setSelectedColor}
        />

        

        <button onClick={handleReset}>Reset</button>
        <button onClick={handleSave} >Save</button>
        <header>SAVED DRAWINGS: {savedDrawings.length}</header>
      </div> 

      <div className="main-content">
            <PixelGrid 
              grid={grid}
              onMouseDown={handleMouseDown}
              onPaint={handlePaint}
              onMouseUp={handleMouseUp}
            />
            <Gallery 
              savedDrawings={savedDrawings}
              onSave={handleSave}
              onLoad={handleLoad}
              onDelete={handleDelete}
            />
      </div>
     

      
    </div>
  )
}

export default App
