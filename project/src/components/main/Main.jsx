import React from "react";
import styles from './Main.module.scss'
import cn from 'classnames';

function Main() {
  return (
    <div className={cn(styles.main, styles.heigth)}>
      <p className={styles.main__title}>
        Hello World!
      </p>
    </div>
  )
}

export default Main;
