function Gallery({ drawings, loadDrawing, deleteDrawing }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Gallery ({drawings.length})</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {drawings.map((drawing, idx) => (
          <div key={idx} style={{ textAlign: "center" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${drawing[0].length}, 10px)`,
                gridTemplateRows: `repeat(${drawing.length}, 10px)`,
                marginBottom: "5px",
              }}
            >
              {drawing.map((row, i) =>
                row.map((color, j) => (
                  <div
                    key={`${i}-${j}`}
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: color,
                      border: "1px solid #eee",
                      boxSizing: "border-box",
                    }}
                  />
                ))
              )}
            </div>
            <button onClick={() => loadDrawing(idx)}>Load</button>
            <button onClick={() => deleteDrawing(idx)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery