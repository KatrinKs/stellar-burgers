import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  const getIconType = (path: string) =>
    location.pathname === path ? 'primary' : 'secondary';

  const isActiveLink = (path: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            className={`${styles.link} ${
              isActiveLink('/', true) ? styles.link_active : ''
            }`}
          >
            <BurgerIcon type={getIconType('/')} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to='/feed'
            className={`${styles.link} ${
              isActiveLink('/feed') ? styles.link_active : ''
            }`}
          >
            <ListIcon type={getIconType('/feed')} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <NavLink to='/'>
            <Logo className='' />
          </NavLink>
        </div>
        <NavLink
          to='/profile'
          className={`${styles.link_position_last} ${
            isActiveLink('/profile') ? styles.link_active : ''
          }`}
        >
          <ProfileIcon type={getIconType('/profile')} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </nav>
    </header>
  );
};
