import React from "react";
import generalStyles from '../main/Main.module.scss';
import styles from './Back.module.scss';
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

function Back() {
  return (
    <p className={generalStyles.main}>
      <Link to={AppRoute.MAIN} className={styles.text}>
        back to menu
      </Link>
    </p>
  )
}

export default Back;
