import Cell from "./Cell";

function Grid({ grid, onCellPaint }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${grid[0].length}, 25px)`,
        gridTemplateRows: `repeat(${grid.length}, 25px)`,
        gap: 0,
      }}
    >
      {grid.map((row, i) =>
        row.map((color, j) => (
          <Cell
            key={`${i}-${j}`}
            color={color}
            onPaint={(e) => {
              if (e.buttons === 1 || e.type === "mousedown") {
                onCellPaint(i, j);
              }
            }}
          />
        ))
      )}
    </div>
  );
}

export default Grid