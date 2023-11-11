import { NavLink as RouterNavLink, NavLinkProps } from 'react-router-dom';
import classes from './NavLink.module.css';

export const CustomNavLink = ({ ...props }: NavLinkProps) => {
  return (
    <RouterNavLink
      {...props}
      className={({ isActive }) =>
        isActive ? `${classes.activeLink} ${classes.link}` : `${classes.link}`
      }
    >
      {props.children}
    </RouterNavLink>
  );
};
