import styles from './input.module.css';

function Input({ type, text, name, value, onChange, onBlur,min, max }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        max={max}
        min={min}
      />
    </div>
  );
}

export default Input;
