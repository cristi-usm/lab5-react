import styles from "./style.module.css";

const Cell = ({
  color,
  rowIndex,
  cellIndex,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  return (
    <div
      className={styles.pixelCell}
      style={{ backgroundColor: color ?? "var(--cell-empty)" }}
      onMouseDown={() => onMouseDown(rowIndex, cellIndex)}
      onMouseEnter={() => onMouseEnter(rowIndex, cellIndex)}
      onMouseUp={onMouseUp}
    />
  );
};

export default Cell;
