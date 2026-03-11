export default function Canvas({
  grid,
  onCellMouseDown,
  onCellMouseEnter
}) {
  return (
    <div
      className="canvas"
      style={{
        gridTemplateColumns: `repeat(${grid.length}, 1fr)`,
        gridTemplateRows: `repeat(${grid.length}, 1fr)`
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cellColor, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="pixel-cell"
            style={{ backgroundColor: cellColor }}
            onMouseDown={() => onCellMouseDown(rowIndex, colIndex)}
            onMouseEnter={() => onCellMouseEnter(rowIndex, colIndex)}
            draggable={false}
          />
        ))
      )}
    </div>
  );
}