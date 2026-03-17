import styles from "./style.module.css";
import Thumbnail from "../Thumbnail/Thumbnail.jsx";

const Gallery = ({ drawings, onLoadDrawing, onDeleteDrawing }) => {
  return (
    <section className={styles.gallerySection}>
      <h2 className={styles.galleryTitle}>
        Saved Drawings ({drawings.length})
      </h2>

      {drawings.length === 0 ? (
        <div className={styles.emptyGallery}>
          <p>No drawings yet</p>
        </div>
      ) : (
        <div className={styles.galleryList}>
          {drawings.map((drawing) => (
            <Thumbnail
              key={drawing.id}
              drawing={drawing}
              onLoad={onLoadDrawing}
              onDelete={onDeleteDrawing}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Gallery;
