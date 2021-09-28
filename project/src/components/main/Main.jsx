import React from "react";
import styles from './Main.module.scss';
import { AppRoute } from "../../const";
import { Link } from 'react-router-dom';

const projects = [
  {
    title: 'Todo List',
    route: AppRoute.TODO,
  },
  {
    title: 'Slider',
    route: AppRoute.SLIDER,
  },
  {
    title: 'Password Generator',
    route: AppRoute.GENERATOR,
  },
]

function Main() {

  return (
    <div className={styles.main}>
      <h1 className={styles.main__title}>
        Mini projects on JavaScript
      </h1>
      <ul className={styles.main__list}>
        {projects.map(project => (
          <li className={styles.item} key={project.title}>
            <Link to={project.route}>
              <p className={styles.main__text}>
                {project.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Main;
