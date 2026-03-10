import styles from "./Gallery.module.css";

function Gallery({ savedDrawings, onLoad, onDelete }) {
  return (
    <div className={styles.gallery}>
      <h2>Galerie ({savedDrawings.length} desene)</h2>
      <div className={styles.thumbnails}>
        {savedDrawings.map((drawing) => (
          <div key={drawing.id} className={styles.thumbnail}>
            <canvas
              width={100}
              height={100}
              ref={(canvas) => {
                if (!canvas) return;
                const ctx = canvas.getContext("2d");
                const cellSize = 100 / drawing.grid.length;
                drawing.grid.forEach((row, r) => {
                  row.forEach((color, c) => {
                    ctx.fillStyle = color;
                    ctx.fillRect(
                      c * cellSize,
                      r * cellSize,
                      cellSize,
                      cellSize,
                    );
                  });
                });
              }}
            />
            <div className={styles.buttons}>
              <button onClick={() => onLoad(drawing.grid)}>Load</button>
              <button onClick={() => onDelete(drawing.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
