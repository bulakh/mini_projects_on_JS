import React from "react";
import styles from './Main.module.scss';
import { AppRoute } from "../../const";
import { Link } from 'react-router-dom';

function Main() {

  return (
    <div className={styles.main}>
      <h1 className={styles.main__title}>
        Mini projects on JavaScript
      </h1>
      <ul className={styles.main__list}>
        <li className={styles.item}>
          <Link to={AppRoute.TODO}>
            <p className={styles.main__text}>
              Todo List
            </p>
          </Link>
        </li>
        <li className={styles.item}>
          <Link to={AppRoute.CALC}>
            <p className={styles.main__text}>
              Calculator
            </p>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Main;
