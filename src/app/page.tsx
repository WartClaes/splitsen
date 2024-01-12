'use client'

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import JSConfetti from 'js-confetti';

import { Keyboard } from '@/components/keyboard';
import { Progress } from '@/components/progress';

import styles from './page.module.css'

export default function Home() {
  const allNumbers = 10 * (10 + 1) / 2;
  const [total, setTotal] = useState<number>();
  const [left, setLeft] = useState<number>();
  const [disabled, setDisabled] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const confettiRef = useRef<JSConfetti>();
  const cacheRef = useRef<string[]>([]);

  const init = useCallback(() => {
    const total = Math.floor(Math.random() * 10) + 1;
    const left = Math.floor(Math.random() * total + 1);
    const key = `${total}-${left}`;

    if (cacheRef.current.length === allNumbers) {
      confettiRef.current?.addConfetti({
        emojis: ['🦄'],
      });
      setDone(true);
      return;
    }

    if (cacheRef.current.includes(key)) {
      console.log('again', key);
      init();
      return;
    }

    setTotal(total);
    setLeft(left);

    cacheRef.current.push(key);

    setDisabled([]);
  }, [])

  const right = useMemo(() => {
    if(!total || !left) return 0;

    return total - left;
  }, [total, left]);

  function keyboardHandler(key: number) {
    if (key !== right) {
      setDisabled([...disabled, key]);
      return
    }

    confettiRef.current?.addConfetti();

    init();
  }

  useEffect(() => {
    confettiRef.current = new JSConfetti();

    init();
  }, [init]);
  ;
  return (
    <main className={styles.main}>
      { done ? (
        <div className={styles.end}>
          EINDE!
        </div>
      ) : (
        <>
          <div className={styles.shape}>
            <div className={styles.total}>
              <div className={styles.box}>
                { total }
              </div>
            </div>

            <div className={styles.left}>
              <div className={styles.box}>
                { left }
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.box} />
            </div>
          </div>

          <Keyboard disabled={disabled} onClick={keyboardHandler} />

          <Progress current={cacheRef.current.length} max={allNumbers} />
        </>
      )}
    </main>
  )
}
