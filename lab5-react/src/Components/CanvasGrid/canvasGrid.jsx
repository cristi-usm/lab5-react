import styles from "./canvasGrid.module.css";

function CanvasGrid({
  grid,
  gridSize,
  onCellMouseDown,
  onCellMouseEnter,
  onStopPainting,
}) {
  const gridStyle = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
  };

  return (
    <div
      className={styles.grid}
      style={gridStyle}
      onMouseUp={onStopPainting}
      onMouseLeave={onStopPainting}
    >
      {grid.map((cellColor, index) => (
        <div
          key={index}
          className={styles.cell}
          style={{ backgroundColor: cellColor }}
          onMouseDown={() => onCellMouseDown(index)}
          onMouseEnter={() => onCellMouseEnter(index)}
          draggable={false}
        />
      ))}
    </div>
  );
}

export default CanvasGrid;