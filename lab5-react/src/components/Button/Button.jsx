import styles from "./Button.module.css";

export function Button({ children, onClick }) {
  return (
    <button className={styles[children]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
