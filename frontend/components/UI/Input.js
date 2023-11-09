import { useImperativeHandle, useRef, forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  const inputRef = useRef();

  console.log("data in input " + inputRef.current?.value);

  const getValue = () => {
    return inputRef.current?.value;
  };

  const clear = () => {
    return (inputRef.current.value = "");
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        value: getValue(),
        clear,
      };
    },
    [getValue(), clear]
  );

  return (
    <div className={styles["input-container"]}>
      <input
        ref={inputRef}
        name={props.name}
        type={props.type}
        className={styles.input}
        onChange={props.onChange}
        required
      />
      <label className={styles.label}>{props.placeholder}</label>
    </div>
  );
});

export default Input;
