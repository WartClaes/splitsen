import styles from './keyboard.module.css';

type KeyboardProps = {
  disabled: number[];
  onClick: (key: number) => void;
}

export function Keyboard({ disabled, onClick }: KeyboardProps) {
  const amountArray = Array.from(Array(10 + 1).keys());

  return (
    <div className={styles.keyboard}>
      { amountArray.map((a) => (
        <button key={a} disabled={disabled.includes(a)} className={styles.key} onClick={() => onClick(a)}>{a}</button>
      ))}
    </div>
  );
}
