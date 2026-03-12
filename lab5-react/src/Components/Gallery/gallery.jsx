import styles from "./gallery.module.css";

function Gallery({ drawings, onLoad, onDelete, totalSaved, gridSize }) {
  return (
    <div className={styles.gallerySection}>
      <h2>Galerie</h2>

      <p>Total desene salvate: {totalSaved}</p>

      <div className={styles.gallery}>
        {drawings.map((drawing) => (
          <div key={drawing.id} className={styles.card}>
            <div
              className={styles.thumbnail}
              style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
              }}
              onClick={() => onLoad(drawing)}
            >
              {drawing.pixels.map((pixel, index) => (
                <div
                  key={index}
                  className={styles.pixel}
                  style={{ backgroundColor: pixel }}
                />
              ))}
            </div>

            <button onClick={() => onLoad(drawing)}>Load</button>
            <button onClick={() => onDelete(drawing.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;