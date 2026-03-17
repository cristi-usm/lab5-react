import styles from "./style.module.css";

const Controls = ({ onReset, onSave, isSaveDisabled }) => {
  return (
    <section className={styles.controls}>
      <button
        type="button"
        className={styles.actionButton}
        onClick={onSave}
        disabled={isSaveDisabled}
      >
        Save
      </button>
      <button
        type="button"
        className={styles.secondaryButton}
        onClick={onReset}
      >
        Reset
      </button>
    </section>
  );
};

export default Controls;
