import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={styles["input-container"]}>
      <input
        name={props.name}
        type={props.type}
        className={styles.input}
        onChange={props.onChange}
        value={props.value}
        required
      />
      <label className={styles.label}>{props.placeholder}</label>
    </div>
  );
};

export default Input;
