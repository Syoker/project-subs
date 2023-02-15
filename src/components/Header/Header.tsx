import HamburgerMenu from '@/components/HamburgerMenu';

import styles from './styles/styles.module.css';

export default function Header() {
  return <header className={styles.container}>
    <h1>SyokerSubs</h1>
    <HamburgerMenu />
  </header>
}