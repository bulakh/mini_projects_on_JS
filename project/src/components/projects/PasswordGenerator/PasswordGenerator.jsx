import React, { useRef, useState } from "react";
import styles from './PasswordGenerator.module.scss';
import generalStyles from '../../main/Main.module.scss';
import cn from 'classnames'
import Back from "../../Back/Back";
import { getRandomInteger } from "../../../util";
import { alphabetUpper, alphabetLower, numbers, specialSymbols } from '../../../const'

const initialCustoms = [
  {
    title: 'Numbers',
    isChecked: true,
  },
  {
    title: 'Lower letters',
    isChecked: true,
  },
  {
    title: 'Upper letters',
    isChecked: true,
  },
  {
    title: 'Special symbols',
    isChecked: true,
  },
  {
    title: 'Dont repeat',
    isChecked: true,
  },
]


function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [customSettings, setCustomSettings] = useState(initialCustoms);
  const [copySuccess, setCopySuccess] = useState(styles.password__button);
  const lengthRef = useRef();
  const passwordAreaRef = useRef();

  const checkNumber = (evt) => {
    const changedCustoms = [...customSettings];

    changedCustoms.map(custom => (
      custom.title === evt.target.dataset.name && (custom.isChecked = !custom.isChecked)
    ))

    setCustomSettings(changedCustoms);

    setDisabledBtn(isNaN(Number(lengthRef.current.value))  ? true : false);
  }


  const getPassword = (evt) => {
    evt.preventDefault();
    const passwordItems = [];
    const allItemsCustoms = [];

    customSettings[0].isChecked && allItemsCustoms.push(...numbers);
    customSettings[1].isChecked && allItemsCustoms.push(...alphabetLower);
    customSettings[2].isChecked && allItemsCustoms.push(...alphabetUpper);
    customSettings[3].isChecked && allItemsCustoms.push(...specialSymbols);

    allItemsCustoms.length === 0 && allItemsCustoms.push(...alphabetLower, ...numbers, ...alphabetUpper);

    for (let i=0; i<lengthRef.current.value; i++) {

      const randomItem = allItemsCustoms[getRandomInteger(0, allItemsCustoms.length - 1)];

      if (customSettings[4].isChecked) {

        if (allItemsCustoms.length === 0) {
          break
        };

        const indexItem = allItemsCustoms.indexOf(randomItem);

        indexItem > -1 && allItemsCustoms.splice(indexItem, 1);
      }

      passwordItems.push(randomItem);
    }

    setPassword(passwordItems.join(''));
    setCopySuccess(styles.password__button);
  }

  const copiedPassword = () => {
    navigator.clipboard.writeText(password);
    setCopySuccess(cn(styles.password__button, styles.password__button__done));
  }


  return (
    <div className={generalStyles.page}>
      <h1 className={cn(generalStyles.main__title, generalStyles.page__title)}>
        Password Generator
      </h1>
      <Back />
      <section className={cn(generalStyles.wrap, generalStyles.page__wrap)}>
        <h2 className={generalStyles.hidden}>Password Generator</h2>
        <form action="#" className={cn(styles.block, styles.block__form)}>
          <ul onChange = {checkNumber}>
            {customSettings.map(custom => (
              <li className={styles.item} key={custom.title}>
                <label className={styles.check}>
                  <p>{custom.title}</p>
                  <input
                    data-name={custom.title}
                    className={cn(generalStyles.hidden, styles.check__input)}
                    type="checkbox"
                    defaultChecked={custom.isChecked ? 'checked' : false}
                  />
                  <span
                    className={styles.check__box}
                  ></span>
                </label>
              </li>
            ))}
            <li className={styles.item}>
              <label className={styles.check}>
                <p>Length</p>
                <input
                  ref={lengthRef}
                  className={styles.check__length}
                  type="text"
                  defaultValue={12}
                  maxLength='2'
                />
              </label>
            </li>
          </ul>
          <button
            type='submit'
            className={styles.button}
            onClick={getPassword}
            disabled={disabledBtn ? 'disabled' : false}
          >
            Generate
          </button>
        </form>
        <div className={cn(styles.password, styles.block)}>
          <span
            className={styles.password__text}
            ref={passwordAreaRef}
          >{password}</span>
          {password && <button
            className={copySuccess}
            onClick={copiedPassword}
          >
          </button>}
        </div>
      </section>
    </div>
  )
}

export default PasswordGenerator;
