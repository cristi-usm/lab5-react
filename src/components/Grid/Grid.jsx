import styles from "./style.module.css";
import Cell from "../Cell/Cell.jsx";

const Grid = ({ grid, onCellMouseDown, onCellMouseEnter, onStopPainting }) => {
  return (
    <div className={styles.canvasCard}>
      <div className={styles.pixelGrid} onMouseLeave={onStopPainting}>
        {grid.map((row, rowIndex) =>
          row.map((color, cellIndex) => (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              color={color}
              rowIndex={rowIndex}
              cellIndex={cellIndex}
              onMouseDown={onCellMouseDown}
              onMouseEnter={onCellMouseEnter}
              onMouseUp={onStopPainting}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default Grid;
