import styles from "./style.module.css";

const Palette = ({ colors, selectedColor, onSelectColor }) => {
  return (
    <section className={styles.paletteRow}>
      {colors.map((color) => {
        const isActive = color.hex === selectedColor;

        return (
          <button
            key={color.hex}
            type="button"
            className={`${styles.paletteSwatch} ${isActive ? styles.paletteSwatchActive : ""}`}
            onClick={() => onSelectColor(color.hex)}
            aria-label={`Select ${color.name}`}
            title={color.name}
          >
            <span
              className={styles.paletteSwatchColor}
              style={{ backgroundColor: color.hex }}
            />
          </button>
        );
      })}
    </section>
  );
};

export default Palette;
