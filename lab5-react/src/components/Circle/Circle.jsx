import styles from "./Circle.module.css";

export function Circle({ color, onClickColor, isSelected = false }) {
  return (
    <button
      className={`${styles.circle} ${isSelected && styles.selected}`}
      onClick={() => onClickColor()}
      style={{ backgroundColor: color }}
    ></button>
  );
}

export default Circle;
