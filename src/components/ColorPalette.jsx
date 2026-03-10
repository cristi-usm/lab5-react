import colorsData from "../colors.json";
import styles from "./ColorPalette.module.css";

function ColorPalette({ selectedColor, setSelectedColor }) {
  return (
    <div className={styles.palette}>
      {colorsData.colors.map((color) => (
        <div
          key={color.id}
          onClick={() => setSelectedColor(color.hex)}
          title={color.name}
          className={`${styles.colorCell} ${color.hex === selectedColor ? styles.selected : ""}`}
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
  );
}

export default ColorPalette;
