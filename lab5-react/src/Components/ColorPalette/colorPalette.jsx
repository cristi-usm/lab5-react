import styles from "./colorPalette.module.css";

function ColorPalette({ colors, selectedColor, onSelectColor }) {
  return (
    <div className={styles.paletteSection}>
      <h2>Paleta de culori</h2>

      <div className={styles.palette}>
        {colors.map((color) => (
          <button
            key={color}
            className={`${styles.colorBtn} ${
              selectedColor === color ? styles.selected : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onSelectColor(color)}
          />
        ))}
      </div>

      <p>
        Culoare selectata: <b>{selectedColor}</b>
      </p>
    </div>
  );
}

export default ColorPalette;