import React, {useState, useRef} from "react";
import { nanoid } from 'nanoid';
import styles from './TodoList.module.scss';
import generalStyles from '../../main/Main.module.scss';
import cn from 'classnames';
import Back from "../../Back/Back";

const tasks = [
  {
    id: nanoid(),
    text: 'Do this app',
    isDone: false,
  },
  {
    id: nanoid(),
    text: 'Go for a walk',
    isDone: true,
  },
  {
    id: nanoid(),
    text: 'Read book',
    isDone: false,
  },
]

function TodoList() {
  const inputRef = useRef();
  const [tasksValue, setTasksValue] = useState(tasks);


  const addTask = (evt) => {
    evt.preventDefault();
    const newTask = {
      id: nanoid(),
      text: inputRef.current.value,
      isDone: false,
    }

    inputRef.current.value && setTasksValue([...tasksValue, newTask]);
    inputRef.current.value = null;
  }

  const removeTask = (evt) => {
    setTasksValue(tasksValue.filter(task => (
      task.id !== evt.target.dataset.id
    )));
  }

  const clearTasks = () => {
    setTasksValue([]);
  }

  return (
    <div className={generalStyles.page}>
      <h1 className={cn(generalStyles.main__title, generalStyles.page__title)}>
        Todo List
      </h1>
      <Back />
      <div className={cn(generalStyles.wrap, styles.todo__wrap)}>
        <form className={cn(styles.block, styles.block__input)}>
          <input
            ref={inputRef}
            type="text"
            placeholder='new task ...'
          />
          <button
            className={styles.button}
            type='submit'
            onClick={addTask}
          >
            add
          </button>
        </form>
        <div className={cn(styles.block, styles.block__tasks)}>
          <ul onClick={removeTask}>
            {tasksValue.map(task => (
              <li className={styles.task} key={task.id}>
                <label className={styles.check}>
                  <input
                    className={cn(generalStyles.hidden, styles.check__input)}
                    type="checkbox"
                    defaultChecked={task.isDone ? 'checked' : ''}
                  />
                  <span
                    className={styles.check__box}
                  ></span>
                  <p className={styles.check__text}>{task.text}</p>
                </label>
                <button data-id={task.id} className={cn(styles.button, styles.cross)}></button>
              </li>
            ))}
          </ul>
          {(tasksValue.length === 0) && <p>add your first task</p>}
          <button
            className={styles.button}
            onClick={clearTasks}
          >all clear</button>
        </div>
      </div>
    </div>
  )
}

export default TodoList;
