import Image from 'next/image'
import classNames from 'classnames';
import styled from 'styled-components'
import { useState } from 'react';

import styles from './styles/styles.module.css';

interface CarouselProps {
  seriesTitle: string[];
  format: string[];
  coversSource: string[];
  coversAlternative: string[];
  allGenres: string[][];
  seriesPath: string[];
}

interface CardProps {
  serieTitle: string;
  format: string;
  coverSource: string;
  coverAlternative: string;
  allGenres: string[][];
  path: string;
  i: number;
}

const CardBackgroundCover = styled.div<{ coverPath: string }>`
  background-image: url(${props => props.coverPath});
`;

const CardContainerMove = styled.div<{ position: number }>`
  transform: translateX(${props => props.position}%);
`;

const PointersRows = styled.div<{ display: string }>`
  display: ${props => props.display};
`;

export default function Carousel({ seriesTitle, format, coversSource, coversAlternative, seriesPath, allGenres }: CarouselProps) {
  let [position, setPosition] = useState(0);
  let [newPosition, setNewPosition] = useState(0);

  const cardsHTML = [];

  function onClick(direction: 'left' | 'right') {
    switch (direction) {
      case 'left':
        let currentPositionLeft = (position - 1 + seriesTitle.length) % seriesTitle.length;

        setPosition(currentPositionLeft)
        setNewPosition((currentPositionLeft * -50))
        break;

      case 'right':
        let currentPositionRight = (position + 1) % seriesTitle.length;

        setPosition(currentPositionRight);
        setNewPosition(currentPositionRight * -50);
        break;
    }
  }

  for (let i = 0; i < seriesTitle.length; i++) {
    cardsHTML.push(
      <Card key={i}
        serieTitle={seriesTitle[i]}
        format={format[i]}
        coverSource={coversSource[i]}
        coverAlternative={coversAlternative[i]}
        allGenres={allGenres}
        path={seriesPath[i]}
        i={i}
      />
    )
  };

  return <>
    <div className={styles.container}>
      <CardContainerMove position={newPosition} className={styles.cardContainerStyle}>{cardsHTML}</CardContainerMove>
    </div>
    <PointersRows display={seriesTitle.length <= 1 ? 'none' : 'block'} className={styles.pointersRows}>
      <Pointers seriesTitleLength={seriesTitle.length} currentPosition={position} />
      <Rows onClick={onClick} />
    </PointersRows>
  </>
}

export function Card({ serieTitle, format, coverSource, coverAlternative, allGenres, path, i }: CardProps) {
  const allGenresLength = allGenres[i] != undefined ? allGenres[i].length : 1;
  const genresHTML = [];

  for (let j = 0; j < allGenresLength; j++) {
    genresHTML.push(
      <h5 key={j}>{allGenres[i] != undefined ? allGenres[i][j] : 'No Genre'}</h5>
    )
  };

  return <a href={path ? path : '#'} className={styles.card}>
    <article>
      <CardBackgroundCover coverPath={coverSource ? `/img/${coverSource}` : '/img/no-image-available.png'} className={styles.cardBackgroundCover} />
      <div className={styles.cardBackgroundCoverTapestry} />
      <div>
        <Image
          className={styles.cover}
          src={coverSource ? `/img/${coverSource}` : '/img/no-image-available.png'}
          alt={coverAlternative ? coverAlternative : serieTitle}
          width={112}
          height={112}
          blurDataURL='data:...'
          placeholder='blur'
        />
        <div>
          <h3>{serieTitle}</h3>
          <div>
            <h4>Formato: {format ? format : 'No Format'}</h4>
            <div className={styles.genres}>
              {genresHTML}
            </div>
          </div>
        </div>
      </div>
    </article>
  </a>
}

export function Pointers({ seriesTitleLength, currentPosition }: { seriesTitleLength: number, currentPosition: number }) {
  const pointerHTML = [];

  for (let i = 0; i < seriesTitleLength; i++) {
    pointerHTML.push(<li key={i} className={i == currentPosition ? styles.active : ''}></li>)
  };

  return <ul>{pointerHTML}</ul>
}

export function Rows({ onClick }: { onClick: (direction: 'left' | 'right') => void }) {
  return <div>
    <button className={styles.button} onClick={() => onClick('left')}><div className={classNames(styles.arrow, styles.left)} /></button>
    <button className={styles.button} onClick={() => onClick('right')}><div className={classNames(styles.arrow, styles.right)} /></button>
  </div>
}