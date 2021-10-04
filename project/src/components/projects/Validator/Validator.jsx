import React, { useRef, useState } from 'react';
import NumberFormat from 'react-number-format';
import styles from './Validator.module.scss';
import generalStyles from '../../main/Main.module.scss';
import cn from 'classnames';
import Back from '../../Back/Back';
import { alphabetUpper, alphabetLower, numbers, specialSymbols } from '../../../const'



function Validator() {

  const [overlay, setOverlay] = useState(styles.overlay);
  const [phoneDone, setPhoneDone] = useState(false);
  const [complexity, setComplexity] = useState('');
  const [repeatDone, setRepeatDone] = useState(false);
  const [numberCardDone, setNumberCardDone] = useState(false);
  const [nameCardDone, setNameCardDone] = useState(false);
  const [dateCardDone, setDateCardDone] = useState(false);
  const [cvvCardDone, setCvvCardDone] = useState(false);

  const phoneInput = useRef();
  const passwordInput = useRef();
  const repeatPasswordInput = useRef();
  const numberCard = useRef();
  const nameCard = useRef();
  const dateCard = useRef();
  const cvvCard = useRef();



  const showOverlay = () => {
    setOverlay(cn(styles.overlay, styles.overlay__shown));
  }

  const hiddenOverlay = () => {
    setOverlay(styles.overlay);
  }

  const checkComplexity = () => {
    console.log(passwordInput.current.value);
    const currentPassword = passwordInput.current.value;

    currentPassword.length < 8 && setComplexity('');

    const lowerLetters = currentPassword.split('').filter(x => alphabetLower.includes(x));

    const upperLetters = currentPassword.split('').filter(x => alphabetUpper.includes(x));

    const numberItems = currentPassword.split('').filter(x => numbers.includes(Number(x)));

    const specialItems = currentPassword.split('').filter(x => specialSymbols.includes(x));

    currentPassword.length > 7 && setComplexity('weak password!');
    currentPassword.length > 7 && lowerLetters.length > 0 && numberItems.length > 0 && setComplexity('weak password!');
    currentPassword.length > 10 && lowerLetters.length > 0 && numberItems.length > 0 && upperLetters.length > 0 && setComplexity('average password');
    currentPassword.length > 14 && lowerLetters.length > 0 && numberItems.length > 0 && upperLetters.length > 0 && specialItems.length > 0 && setComplexity('strong password!');
  }

  const checkRepeatPassword = () => {
    passwordInput.current.value === repeatPasswordInput.current.value && setRepeatDone(true);

    passwordInput.current.value !== repeatPasswordInput.current.value && setRepeatDone(false);
  }

  const checkName = () => {
    const currentName = nameCard.current.value;

    const onlyUpper = currentName.split('').filter(x => [...alphabetLower,...alphabetUpper, ' '].includes(x)).map(x => x.toUpperCase());

    nameCard.current.value = onlyUpper.join('');

    nameCard.current.value !== ' ' && setNameCardDone(true);
    nameCard.current.value === '' && setNameCardDone(false);
    console.log(nameCard.current.value);
  }

  const checkInput = (currentInput, setState) => {
    const current = currentInput.current.value;

    const lastItemCurrent = current.split('')[current.length - 1];

    lastItemCurrent !== ' ' &&  setState(true);
    lastItemCurrent === ' ' &&  setState(false);
    lastItemCurrent === undefined &&  setState(false);
  }

  return (
    <div className={cn(generalStyles.page, styles.page)}>
      <h1 className={cn(generalStyles.main__title, generalStyles.page__title)}>
        Form Validator
      </h1>
      <Back />
      <section className={cn(generalStyles.wrap, generalStyles.page__wrap)}>
        <form action='#' className={styles.form}>
          <ul className={styles.form__list}>
            <li>
              <label  className={styles.list__label}>
                <p>Phone Number</p>
                <NumberFormat
                  onChange={() => checkInput(phoneInput, setPhoneDone)}
                  getInputRef={phoneInput}
                  type='tel'
                  placeholder='+7(XXX)XXX-XX-XX'
                  format= '+7(###) ###-##-##'
                  required
                />
                {phoneDone && <div className={styles.done}></div>}
              </label>
            </li>
            <li>
              <label className={styles.list__label}>
                <p>Password</p>
                <input
                  ref={passwordInput}
                  onChange={checkComplexity}
                  type='password'
                  className={styles.password}
                  required
                />
                {complexity !== '' && <div className={styles.done}></div>}
                <span className={styles.signature}>{complexity}</span>
              </label>
            </li>
            <li>
              <label className={styles.list__label}>
                <p>Repeat Password</p>
                <input
                  onChange={checkRepeatPassword}
                  ref={repeatPasswordInput}
                  type='password'
                  className={styles.password}
                  required
                />
                {repeatDone && <div className={styles.done}></div>}
              </label>
            </li>
          </ul>
          <div className={styles.wrap}>
            <ul className={cn(styles.form__list, styles.card)}>
              <li className={styles.card__number}>
                <label className={styles.card__label}>
                  <p>card number</p>
                  <NumberFormat
                    onChange={() => checkInput(numberCard, setNumberCardDone)}
                    getInputRef={numberCard}
                    format= '#### #### #### ####'
                    placeholder='0000 0000 0000 0000'
                    required
                  />
                  {numberCardDone && <div className={styles.card__done}></div>}
                </label>
              </li>
              <li className={styles.card__name}>
                <label className={styles.card__label}>
                  <p>owner name</p>
                  <input
                    onChange={checkName}
                    ref={nameCard}
                    type='text'
                    placeholder='TOM JOAD'
                    required
                  />
                  {nameCardDone && <div className={styles.card__done}></div>}
                </label>
              </li>
              <li className={styles.card__date}>
                <label className={styles.card__label}>
                  <p>month/year</p>
                  <NumberFormat
                    onChange={() => checkInput(dateCard, setDateCardDone)}
                    getInputRef={dateCard}
                    format= '##/##'
                    placeholder='00/00'
                    required
                  />
                  {dateCardDone && <div className={styles.card__done}></div>}
                </label>
              </li>
              <li className={styles.card__cvv}>
                <label className={styles.card__label}>
                  <p>CVV/CVC</p>
                  <NumberFormat
                    onChange={() => checkInput(cvvCard, setCvvCardDone)}
                    getInputRef={cvvCard}
                    format= '###'
                    placeholder='000'
                    required
                  />
                  {cvvCardDone && <div className={styles.card__done}></div>}
                </label>
              </li>
            </ul>
          </div>
          <button
            type='submit'
            className={styles.form__button}
            onClick={showOverlay}
            disabled={
              complexity &&
              repeatDone &&
              phoneDone &&
              numberCardDone &&
              nameCardDone &&
              dateCardDone &&
              cvvCardDone ?
              false :
              'disabled'
            }
          >
            Send
          </button>
        </form>
        <div className={overlay}>
          <div className={styles.popup}>
            <p>Congratulations, you passed the validation!</p>
            <button
              className={styles.form__button}
              onClick={hiddenOverlay}
            >Ok</button>
          </div>
        </div>

      </section>
    </div>
  )
}

export default Validator;
