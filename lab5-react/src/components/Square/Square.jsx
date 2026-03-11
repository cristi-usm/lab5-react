import styles from "./Square.module.css";

export function Square({ color, onSquareClick }) {
  return (
    <button
      className={styles.canvaSquare}
      onClick={onSquareClick}
      style={{ backgroundColor: color || "#F0F0F0" }}
    ></button>
  );
}

export default Square;
