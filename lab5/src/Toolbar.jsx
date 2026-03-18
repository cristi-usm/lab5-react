import styles from './Toolbar.module.css'

export default function Toolbar({ onSave, onReset }) {
    return (
        <div className={styles.toolbar}>
            <div className={styles.logo}>
                <span className={styles.logoIcon}>◼</span>
                <span className={styles.logoText}>PIXEL<strong>STUDIO</strong></span>
            </div>
            <div className={styles.actions}>
                <button className={styles.resetBtn} onClick={onReset}>↺ Reset</button>
                <button className={styles.saveBtn} onClick={onSave}>↓ Save</button>
            </div>
        </div>
    )
}