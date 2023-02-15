import { useState } from 'react';
import classNames from 'classnames';

import styles from './styles/styles.module.css'
import button from './styles/button.module.css'
import buttonDesing from './styles/buttonDesing.module.css'
import background from './styles/background.module.css'

export default function HamburgerMenu() {
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  let [isAnimeOptionOpen, setIsAnimeOptionOpen] = useState(false);
  let [isMangaOptionOpen, setIsMangaOptionOpen] = useState(false);

  function onClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function onClickAnime() {
    setIsAnimeOptionOpen(!isAnimeOptionOpen);
  }

  function onClickManga() {
    setIsMangaOptionOpen(!isMangaOptionOpen);
  }

  return <>
    <button className={button.container} onClick={onClick} />
    <div className={classNames(buttonDesing.closedMenu, isMenuOpen ? buttonDesing.openMenu : null)} />
    <div className={classNames(background.closedMenu, isMenuOpen ? background.openMenu : null)} onClick={onClick} />
    <nav className={classNames(styles.closedMenu, isMenuOpen ? styles.openMenu : null)}>
      <div>
        <h3 onClick={onClickAnime}>Anime</h3>
        <ul className={isAnimeOptionOpen ? styles.active : ''}>
          <li><a href="#">Proyectos activos</a></li>
          <li><a href="#">Proyectos finalizados</a></li>
          <li><a href="#">Proyectos abandonados</a></li>
        </ul>
      </div>
      <div>
        <h3 onClick={onClickManga}>Mangas</h3>
        <ul className={isMangaOptionOpen ? styles.active : ''}>
          <li><a href="#">Proyectos activos</a></li>
          <li><a href="#">Proyectos finalizados</a></li>
          <li><a href="#">Proyectos abandonados</a></li>
        </ul>
      </div>
    </nav>

  </>
}
