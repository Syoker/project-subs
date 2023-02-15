import { useState } from 'react';
import classNames from 'classnames';

import styles from './styles/styles.module.css'
import button from './styles/button.module.css'
import buttonDesing from './styles/buttonDesing.module.css'
import background from './styles/background.module.css'

export default function HamburgerMenu() {
  let [isMenuOpen, setIsMenuOpen] = useState(false);

  function onClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return <>
    <button className={button.container} onClick={onClick} />
    <div className={classNames(buttonDesing.closedMenu, isMenuOpen ? buttonDesing.openMenu : null)} />
    <div className={classNames(background.closedMenu, isMenuOpen ? background.openMenu : null)} onClick={onClick} />
    <nav className={classNames(styles.closedMenu, isMenuOpen ? styles.openMenu : null)}>
      <div>
        <h3>Anime</h3>
        <ul>
          <li><a href="#">Proyectos activos</a></li>
          <li><a href="#">Proyectos finalizados</a></li>
          <li><a href="#">Proyectos abandonados</a></li>
        </ul>
      </div>
      <div>
        <h3>Mangas</h3>
        <ul>
          <li><a href="#">Proyectos activos</a></li>
          <li><a href="#">Proyectos finalizados</a></li>
          <li><a href="#">Proyectos abandonados</a></li>
        </ul>
      </div>
    </nav>

  </>
}
