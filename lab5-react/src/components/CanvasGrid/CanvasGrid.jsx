import styles from "./CanvasGrid.module.css";
import { Square } from "@components/Square";

export function CanvasGrid({ onSquareClick, gridData }) {
  return (
    <div className={styles.gridContainer}>
      {gridData.map((color, index) => (
        <Square
          key={index}
          color={color}
          onSquareClick={() => onSquareClick(index)}
        ></Square>
      ))}
    </div>
  );
}

export default CanvasGrid;
