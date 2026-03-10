import { useState, useEffect, useCallback } from "react";
import styles from "./Grid.module.css";

const GRID_SIZE = 20;

function createEmptyGrid() {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill("#FFFFFF"));
}

function Grid({ selectedColor, onGridChange, loadedGrid }) {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [isPainting, setIsPainting] = useState(false);

  useEffect(() => {
    if (loadedGrid) {
    setGrid(loadedGrid.map((r) => [...r]));
    }
  }, [loadedGrid]);

  useEffect(() => {
    onGridChange(grid);
  }, [grid, onGridChange]);

  const paintCell = useCallback(
    (row, col) => {
      setGrid((prev) => {
        const newGrid = prev.map((r) => [...r]);
        newGrid[row][col] = selectedColor;
        return newGrid;
      });
    },
    [selectedColor],
  );

  const handleMouseDown = (row, col) => {
    setIsPainting(true);
    paintCell(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (isPainting) paintCell(row, col);
  };

  const handleMouseUp = () => setIsPainting(false);

  const handleReset = () => setGrid(createEmptyGrid());

  return (
    <div>
      <div
        className={styles.gridContainer}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className={styles.gridRow}>
            {row.map((color, colIdx) => (
              <div
                key={colIdx}
                className={styles.cell}
                onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        ))}
      </div>
      <button className={styles.resetButton} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default Grid;
