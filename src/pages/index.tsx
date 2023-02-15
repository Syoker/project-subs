import Head from '@/components/Head';
import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import LastUpdates from '@/components/LastUpdates';

import { seriesTitle, chaptersTitle, chaptersDate, coversSource, coversAlternative, chaptersPath, seriesPath, format, allGenres } from '@/dataBase'

import main from '@/styles/main.module.css';

export default function HomePage() {
  return <>
    <Head
      title='SyokerSubs'
      description=''
      ogUrl='https://syoker.github.io/es/translations/'
      ogTitle=''
      ogDescription=''
      ogImage=''
    />

    <Header />

    <main className={main.container}>
      <section className={main.lastEntrys}>
        <h2>Nuevos animes y mangas</h2>
        <Carousel 
          seriesTitle={seriesTitle}
          format={format}
          coversSource={coversSource}
          coversAlternative={coversAlternative}
          allGenres={allGenres}
          seriesPath={seriesPath}
        />
      </section>
      <section className={main.lastUpdates}>
        <h2>Últimas actualizaciones</h2>
        <LastUpdates
          seriesTitle={seriesTitle}
          chaptersTitle={chaptersTitle}
          chaptersDate={chaptersDate}
          coversSource={coversSource}
          coversAlternative={coversAlternative}
          chaptersPath={chaptersPath}
        />
      </section>
    </main>
  </>;
}