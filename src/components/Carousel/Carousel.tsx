import Image from 'next/image'
import classNames from 'classnames';
import styled from 'styled-components'
import { useState, useEffect } from 'react';

import arrow from './styles/arrow.module.css';
import styles from './styles/styles.module.css';

interface CarouselProps {
  seriesTitle: string[];
  format: string[];
  coversPath: string[];
  coversAlternative: string[];
  allGenres: string[][];
}

interface CardProps {
  seriesTitle: string;
  format?: string;
  coverPath?: string;
  coverAlternative?: string;
  allGenres: string[][];
  index: number;
}

interface CardBackgroundCoverProps {
  coverPath: string;
}

interface CardContainerMoveProps {
  position: number;
}

interface PointersRowsProps {
  display: string;
}

const CardContainerMove = styled.div<CardContainerMoveProps>`
  transform: translateX(${props => props.position}%);
`

const PointersRows = styled.div<PointersRowsProps>`
  display: ${props => props.display};
`

export default function Carousel({ seriesTitle, format, coversPath, coversAlternative, allGenres }: CarouselProps) {
  let [position, setPosition] = useState(0);
  let [newPosition, setNewPosition] = useState(0);

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

  // useEffect(() => {
  //   let currentPositionRight = (position + 1) % seriesTitle.length;
  //   setTimeout(() => {
  //     setPosition(currentPositionRight);
  //   }, 5000);
  //   setNewPosition(position * -50)
  // }, [position, seriesTitle.length]);

  const cardsHTML = [];

  for (let i = 0; i < seriesTitle.length; i++) {
    cardsHTML.push(
      <Card key={i}
        seriesTitle={seriesTitle[i]}
        format={format[i]}
        coverPath={coversPath[i]}
        coverAlternative={coversAlternative[i]}
        allGenres={allGenres}
        index={i}
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

const CardBackgroundCover = styled.div<CardBackgroundCoverProps>`
  background-image: url(${props => props.coverPath});
`

export function Card({ seriesTitle, format, coverPath, coverAlternative, allGenres, index }: CardProps) {
  const genresHTML = [];
  const allGenresLength = allGenres[index] != undefined ? allGenres[index].length : 1;

  for (let j = 0; j < allGenresLength; j++) {
    genresHTML.push(
      <Genres key={j} genres={allGenres[index] != undefined ? allGenres[index][j] : 'No Genre'} />
    )
  };

  return <a href="#" className={styles.card}>
    <article>
      <CardBackgroundCover coverPath={coverPath ? `./img/${coverPath}` : './img/no-image-available.png'} className={styles.cardBackgroundCover} />
      <div className={styles.cardBackgroundCoverTapestry} />
      <div>
        <Image
          className={styles.cover}
          src={coverPath ? `./img/${coverPath}` : './img/no-image-available.png'}
          alt={coverAlternative ? coverAlternative : 'Image'}
          width={112}
          height={112}
          blurDataURL='data:...'
          placeholder='blur'
        />
        <div>
          <h3>{seriesTitle}</h3>
          <div>
            <h4>Formato: {format}</h4>
            <div className={styles.genres}>
              {genresHTML}
            </div>
          </div>
        </div>
      </div>
    </article>
  </a>
}

export function Genres({ genres }: { genres: string }) {
  return <h5>{genres}</h5>
}

export function Pointers({ seriesTitleLength, currentPosition }: { seriesTitleLength: number, currentPosition: number }) {
  const pointerHTML = [];

  for (let i = 0; i < seriesTitleLength; i++) {
    pointerHTML.push(<li key={i} className={i == currentPosition ? styles.active : ''}></li>)
  };

  return <ul>{pointerHTML}</ul>
}

interface RowsProps {
  onClick: (direction: 'left' | 'right') => void;
}

export function Rows({ onClick }: RowsProps) {
  return <div>
    <button className={styles.button} onClick={() => onClick('left')}><div className={arrow.left} /></button>
    <button className={styles.button} onClick={() => onClick('right')}><div className={arrow.right} /></button>
  </div>
}