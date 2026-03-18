import styles from './DrawingGrid.module.css'

const GRID_SIZE = 20

let isPainting = false

export default function DrawingGrid({ grid, onCellPaint }) {

    const handleMouseDown = (row, col) => {
        isPainting = true
        onCellPaint(row, col)
    }

    const handleMouseEnter = (row, col) => {
        if (isPainting) onCellPaint(row, col)
    }

    const handleMouseUp = () => {
        isPainting = false
    }

    return (
        <div className={styles.gridWrapper} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            <div className={styles.grid} style={{ '--grid-size': GRID_SIZE }}>
                {grid.map((row, ri) =>
                    row.map((color, ci) => (
                        <div
                            key={`${ri}-${ci}`}
                            className={styles.cell}
                            style={{ backgroundColor: color || 'transparent' }}
                            onMouseDown={() => handleMouseDown(ri, ci)}
                            onMouseEnter={() => handleMouseEnter(ri, ci)}
                        />
                    ))
                )}
            </div>
        </div>
    )
}