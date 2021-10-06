import React, { useState } from "react";
import styles from './Slider.module.scss';
import generalStyles from '../../main/Main.module.scss';
import cn from 'classnames'
import { nanoid } from "nanoid";
import { getRandomInteger } from "../../../util";
import Back from "../../Back/Back";


const getRandomPics = () => {
  const pictures = [];

  for (let i=0; i < getRandomInteger(4, 12); i++) {
    const randomPic = {
      id: nanoid(),
      src: `https://picsum.photos/id/${getRandomInteger(1, 1090)}/${getRandomInteger(450, 1000)}/${getRandomInteger(450, 1000)}`,
      alt: 'Something pic',
    };

    pictures.push(randomPic);
  }

  return pictures
}

const pictures = getRandomPics();

function Slider() {
  const [allPisc, setAllPics] = useState(pictures);
  const [pic, setPic] = useState(allPisc[0]);

  const navPic = (evt) => {
    const currentIndexPic = allPisc.indexOf(pic);

    evt.target.dataset.name === 'left' && currentIndexPic !== 0 && setPic(allPisc[currentIndexPic - 1]);
    evt.target.dataset.name === 'right' && currentIndexPic !== allPisc.length - 1  && setPic(allPisc[currentIndexPic + 1]);
  }

  const selectPic = (evt) => {
    allPisc.map(picture => (
      picture.id === evt.target.dataset.id && setPic(picture)
    ))
  }

  const removeBrokenPics = (evt) => {
    setAllPics(
      allPisc.filter(picture => (
        picture.id !== evt.target.dataset.id
      ))
    );
    setPic(allPisc.filter(picture => (
      picture.id !== evt.target.dataset.id
    ))[0]);
  }

  return (
    <div className={generalStyles.page}>
      <h1 className={cn(generalStyles.main__title, generalStyles.page__title)}>
        Slider
      </h1>
      <Back />
      <section className={generalStyles.wrap}>
        <h2 className={generalStyles.hidden}>Slider block</h2>
        <div className={styles.picture__wrap}>
          <img
            onError={removeBrokenPics}
            className={styles.picture}
            src={pic.src}
            alt={pic.alt} />
        </div>
        <div className={styles.buttons} onClick={navPic}>
          <button
            className={styles.buttons__left}
            data-name='left'
            disabled={allPisc.indexOf(pic) === 0 ? 'disabled' : false}
          >
          </button>
          <button
            className={styles.buttons__right}
            data-name='right'
            disabled={allPisc.indexOf(pic) === allPisc.length - 1 ? 'disabled' : false}
          >
          </button>
        </div>
        <ul className={styles.list} onClick={selectPic}>
          {allPisc.map(picture =>(
            <li key={picture.id}>
              <img
                onError={removeBrokenPics}
                data-id={picture.id}
                className={cn(styles.preview, (
                  picture.id === pic.id ? styles.preview__active : ''
                ))}
                src={picture.src}
                alt={picture.alt}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Slider;
