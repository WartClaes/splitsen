import styles from './progress.module.css';

type ProgressProps = {
  current: number;
  max: number;
}

export function Progress({ current, max }: ProgressProps) {
  return (
    <div className={styles.outer}>
      <div className={styles.inner} style={{ width: (current / max) * 100 + '%'}} />
    </div>
  );
}
