import styles from "./style.module.css";

const Thumbnail = ({ drawing, onLoad, onDelete }) => {
  return (
    <article className={styles.thumbnailCard}>
      <div
        className={styles.thumbnailPreview}
        onClick={() => onLoad(drawing.pixels)}
      >
        <div className={styles.thumbnailGrid}>
          {drawing.pixels.map((row, rowIndex) =>
            row.map((color, cellIndex) => (
              <div
                key={`${drawing.id}-${rowIndex}-${cellIndex}`}
                className={styles.thumbnailCell}
                style={{ backgroundColor: color ?? "var(--cell-empty)" }}
              />
            )),
          )}
        </div>
      </div>

      <div className={styles.thumbnailMeta}>
        <div>
          <p className={styles.thumbnailTitle}>{drawing.name}</p>
          <p className={styles.thumbnailCopy}>Saved pixel sketch</p>
        </div>
        <div className={styles.thumbnailActions}>
          <button
            type="button"
            className={styles.miniButton}
            onClick={() => onLoad(drawing.pixels)}
          >
            Load
          </button>
          <button
            type="button"
            className={`${styles.miniButton} ${styles.dangerButton}`}
            onClick={() => onDelete(drawing.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default Thumbnail;
