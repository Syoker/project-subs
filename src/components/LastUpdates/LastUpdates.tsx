import Image from 'next/image';
import styled from 'styled-components'
import React, { useState, useEffect } from "react";

import styles from './styles/styles.module.css';

interface LastUpdatesProps {
  seriesTitle: string[];
  chaptersTitle: string[];
  chaptersDate: string[];
  coversSource: string[];
  coversAlternative: string[];
  chaptersPath: string[];
}

interface EntryProps {
  seriesTitle: string;
  chapterTitle?: string;
  chapterDate?: string;
  coverSource?: string;
  coverAlternative?: string;
  chapterPath?: string;
  cardAmount: number;
}

interface CoverProps {
  coverPath: string;
}

interface CardProps {
  cardWidth: string;
}

export default function LastUpdates({ seriesTitle, chaptersTitle, chaptersDate, coversSource, coversAlternative, chaptersPath }: LastUpdatesProps) {
  const cardAmount = seriesTitle.length;

  const entryHTML = [];

  for (let i = 0; i < seriesTitle.length; i++) {
    entryHTML.push(
      <Entry key={i}
        seriesTitle={seriesTitle[i]}
        chapterTitle={chaptersTitle[i]}
        chapterDate={chaptersDate[i]}
        coverSource={coversSource[i]}
        coverAlternative={coversAlternative[i]}
        chapterPath={chaptersPath[i]}
        cardAmount={cardAmount}
      />
    )
  }

  return <div className={styles.container}>{entryHTML}</div>
}

const Cover = styled.div<CoverProps>`
  background-image: url(${props => props.coverPath});
`;

const Card = styled.a<CardProps>`
  @media (min-width: 80rem) {
    min-width: ${props => props.cardWidth}%;
  }
`;

export function Entry({ seriesTitle, chapterTitle, chapterDate, coverSource, coverAlternative, chapterPath, cardAmount }: EntryProps) {
  const [difference, setDifference] = useState(0);
  const [unit, setUnit] = useState("segundos");

  const targetDate = new Date(`${chapterDate}`);
  let dateParced = targetDate.toLocaleDateString();

  useEffect(() => {
    const targetDate = new Date(`${chapterDate}`);
    const currentDate = new Date();
    let differenceInSeconds = (currentDate.getTime() - targetDate.getTime()) / 1000;

    switch (true) {
      case differenceInSeconds >= 60 && differenceInSeconds < 3600:
        let differenceInMinutes = differenceInSeconds / 60;
        setUnit("minutos");
        setDifference(Math.floor(differenceInMinutes));
        break;
      case differenceInSeconds >= 3600 && differenceInSeconds < 86400:
        let differenceInHours = differenceInSeconds / 3600;
        if (differenceInHours < 2) {
          setUnit("hora");
        } else {
          setUnit("horas");
        }
        setDifference(Math.floor(differenceInHours));
        break;
      case differenceInSeconds >= 86400 && differenceInSeconds < 604800:
        let differenceInDays = differenceInSeconds / 86400;
        setUnit("días");
        setDifference(Math.floor(differenceInDays));
        break;
      case differenceInSeconds >= 604800:
        setUnit("");
        break;
      case dateParced == 'Invalid Date':
        setUnit("undefined");
        break;
      default:
        setDifference(differenceInSeconds);
        break;
    }
  }, [chapterDate, dateParced]);

  return <Card cardWidth={cardAmount > 1 ? '49.3' : '100'} href={chapterPath ? chapterPath : '#'} className={styles.entry}>
    <article>
      <Image
        className={styles.cover}
        src={coverSource ? `/img/${coverSource}` : '/img/no-image-available.png'}
        alt={coverAlternative ? coverAlternative : seriesTitle}
        width={80}
        height={80}
        blurDataURL='data:...'
        placeholder='blur'
      />
      <div>
        <Cover coverPath={coverSource ? `/img/${coverSource}` : '/img/no-image-available.png'} className={styles.entryBackgroundCover} />
        <div className={styles.entryBackgroundCoverTapestry} />
        <h4>{seriesTitle}</h4>
        <h5>{chapterTitle ? chapterTitle : 'No title'}</h5>
        <h6>{unit != 'undefined' ? unit ? `Hace ${difference} ${unit}` : `${dateParced}` : 'No Date'}</h6>
      </div>
    </article>
  </Card>
}