import { useState } from 'react'
import DrawingGrid from './DrawingGrid'
import ColorPalette from './ColorPalette'
import Gallery from './Gallery'
import Toolbar from './Toolbar'
import colorsData from './data/colors.json'
import styles from './App.module.css'

const GRID_SIZE = 20

function createEmptyGrid() {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null))
}

let drawingCounter = 1

export default function App() {
  const [grid, setGrid] = useState(createEmptyGrid)
  const [selectedColor, setSelectedColor] = useState(colorsData[0].hex)
  const [drawings, setDrawings] = useState([])
  const [saveFlash, setSaveFlash] = useState(false)

  const handleCellPaint = (row, col) => {
    setGrid(prev => {
      const next = prev.map(r => [...r])
      next[row][col] = selectedColor === '#ffffff' ? null : selectedColor
      return next
    })
  }

  const handleReset = () => {
    setGrid(createEmptyGrid())
  }

  const handleSave = () => {
    const now = new Date()
    const date = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    const newDrawing = {
      id: Date.now(),
      name: `Drawing #${drawingCounter++}`,
      date,
      grid: grid.map(r => [...r]),
    }
    setDrawings(prev => [newDrawing, ...prev])
    setSaveFlash(true)
    setTimeout(() => setSaveFlash(false), 600)
  }

  const handleLoad = (drawing) => {
    setGrid(drawing.grid.map(r => [...r]))
  }

  const handleDelete = (id) => {
    setDrawings(prev => prev.filter(d => d.id !== id))
  }

  return (
    <div className={styles.app}>
      <Toolbar onSave={handleSave} onReset={handleReset} />
      <div className={styles.workspace}>
        <aside className={styles.sidebar}>
          <ColorPalette
            colors={colorsData}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />
          <div className={styles.divider} />
          <div className={styles.hint}>
            <span className={styles.hintIcon}>◈</span>
            <span>Click &amp; drag to paint</span>
          </div>
          <div className={styles.hint}>
            <span className={styles.hintIcon}>◉</span>
            <span>White = Eraser</span>
          </div>
          <div className={styles.gridInfo}>
            <span className={styles.gridInfoText}>{GRID_SIZE}×{GRID_SIZE} grid</span>
          </div>
        </aside>

        <main className={`${styles.canvasArea} ${saveFlash ? styles.flash : ''}`}>
          <DrawingGrid
            grid={grid}
            onCellPaint={handleCellPaint}
            selectedColor={selectedColor}
          />
        </main>

        <aside className={styles.gallerySidebar}>
          <Gallery
            drawings={drawings}
            onLoad={handleLoad}
            onDelete={handleDelete}
          />
        </aside>
      </div>
    </div>
  )
}