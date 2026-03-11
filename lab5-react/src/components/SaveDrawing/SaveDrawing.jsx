import styles from "./SaveDrawing.module.css";
import { GalleryItem } from "@components/GalleryItem";

export function SaveDrawing({ dataArr, onLoad, onDelete }) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>Saved Drawings ({dataArr.length})</p>
      {dataArr.map((dataArr, index) => (
        <GalleryItem
          key={index}
          drawingData={dataArr}
          onLoad={() => onLoad(index)}
          onDelete={() => onDelete(index)}
        ></GalleryItem>
      ))}
    </div>
  );
}

export default SaveDrawing;
