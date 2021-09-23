import React from "react";
import styles from './TodoList.module.scss'
import otherStyles from '../../main/Main.module.scss'
import cn from 'classnames'

function TodoList() {
  return (
    <>
      <h1 className={cn(otherStyles.main__title, styles.title)}>
        Todo List
      </h1>
      <p>
        Давай работай!!!
      </p>
    </>
  )
}

export default TodoList;
