import styles from "./GalleryItem.module.css";
import { Button } from "@components/Button";

export function GalleryItem({ drawingData, onLoad, onDelete }) {
  return (
    <div className={styles.container}>
      <div className={styles.mini_drawing}>
        {drawingData.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color || "#F0F0F0" }}
            className={styles.miniPixel}
          />
        ))}
      </div>
      <div className={styles.button}>
        <Button onClick={() => onLoad()}>Load</Button>
        <Button onClick={() => onDelete()}>Delete</Button>
      </div>
    </div>
  );
}

export default GalleryItem;
