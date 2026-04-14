import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navItems = [
    { to: '/todos', label: 'Todo List' },
    { to: '/form-builder', label: 'Form Builder' },
  ];

  return (
    <nav className={styles.nav} id="main-navigation">
      <div className={styles.navInner}>
        <span className={styles.logo}>QuestionPro</span>
        <ul className={styles.links}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.linkActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
