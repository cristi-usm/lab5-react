import styles from "./toolbar.module.css";

function Toolbar({ onReset, onSave }) {
  return (
    <div className={styles.toolbar}>
      <button onClick={onReset}>Reset</button>
      <button onClick={onSave}>Save</button>
    </div>
  );
}

export default Toolbar;