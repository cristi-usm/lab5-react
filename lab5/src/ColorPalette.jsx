import styles from './ColorPalette.module.css'

export default function ColorPalette({ colors, selectedColor, onSelectColor }) {
    return (
        <div className={styles.palette}>
            <div className={styles.label}>PALETTE</div>
            <div className={styles.grid}>
                {colors.map((color) => (
                    <button
                        key={color.id}
                        className={`${styles.swatch} ${selectedColor === color.hex ? styles.selected : ''}`}
                        style={{ '--color': color.hex }}
                        onClick={() => onSelectColor(color.hex)}
                        title={color.name}
                    >
                        {selectedColor === color.hex && <span className={styles.checkmark}>✓</span>}
                    </button>
                ))}
            </div>
            <div className={styles.selectedInfo}>
                <span className={styles.selectedDot} style={{ background: selectedColor }} />
                <span className={styles.selectedHex}>{selectedColor}</span>
            </div>
        </div>
    )
}