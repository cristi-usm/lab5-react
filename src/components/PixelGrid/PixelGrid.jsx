import { PixelCell } from "../PixelCell/PixelCell"
import "./PixelGrid.css"
export const PixelGrid = ({grid, onPaint, onMouseDown, onMouseUp}) => {


    return (
        <div className="pixel-grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((cellColor, colIndex) => (
                        <PixelCell 
                            key={`${rowIndex}-${colIndex}`}
                            color={cellColor}
                            onMouseDown={() => onMouseDown(rowIndex, colIndex)}
                            onMouseEnter={() => onPaint(rowIndex, colIndex)}
                            onMouseUp={onMouseUp}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}