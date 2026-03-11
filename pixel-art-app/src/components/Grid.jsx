import { useState } from "react";
export default function Grid({ grid, setGrid, selectedColor }) {
    const [mouseDown, setMouseDown] = useState(false);
    const paintCell = (index) => {

        const newGrid = [...grid]

        newGrid[index] = selectedColor

        setGrid(newGrid)

    }
    return (
        <div className="grid">

            {grid.map((color, index) => (
                <div
                    key={index}
                    className="cell"
                    style={{ backgroundColor: color }}
                    onClick={() => paintCell(index)}

                    onMouseDown={() => {
                        setMouseDown(true)
                        if (mouseDown) {
                            paintCell(index)
                        }

                    }}
                    onMouseEnter={() => {
                        if (mouseDown) {
                            paintCell(index)
                        }
                    }}
                    onMouseUp={() => setMouseDown(false)}
                ></div>
            ))}
        </div>
    )
}