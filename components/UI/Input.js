import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={styles["input-container"]}>
      <input type={props.type} className={styles.input} required />
      <label className={styles.label}>{props.placeholder}</label>
    </div>
  );
};

export default Input;
