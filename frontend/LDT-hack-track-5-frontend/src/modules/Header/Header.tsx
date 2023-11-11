import {
  Anchor,
  Box,
  Burger,
  Button,
  Container,
  Flex,
  Image,
} from '@mantine/core';
import { IconContext } from 'react-icons';
import { BsBell } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { CustomActionIcon } from '../../components/ActionIcon/ActionIcon';
import { CustomNavLink } from '../../components/NavLink/NavLink';
import Logo from '../../assets/icon/proscom-logo.svg';
import classes from './Header.module.css';

export const Header = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Container size='xl' py={25}>
      <Flex hiddenFrom='sm' justify='space-between' align='center'>
        <Burger opened={opened} onClick={toggle} />
        <Image w={80} h={12} src={Logo} />
      </Flex>

      <Box
        component='header'
        hidden={!opened}
        hiddenFrom='sm'
        className={classes.burgerContainer}
      >
        <Box component='nav' className={classes.burgerContainerLinks}>
          <Anchor component={CustomNavLink} to='/'>
            Справочник
          </Anchor>
          <Anchor component={CustomNavLink} to='mission'>
            Задачи
          </Anchor>
          <Anchor component={CustomNavLink} to='team'>
            Команда
          </Anchor>
          <Anchor component={CustomNavLink} to='shop'>
            Активности
          </Anchor>
        </Box>
        <Box className={classes.burgerContainerButtons}>
          <IconContext.Provider value={{ className: classes.icon1 }}>
            <CustomActionIcon>
              <BsBell />
            </CustomActionIcon>
          </IconContext.Provider>
          <IconContext.Provider value={{ className: classes.icon2 }}>
            <CustomActionIcon component={Link} to='account'>
              <MdAccountCircle />
            </CustomActionIcon>
          </IconContext.Provider>
        </Box>
      </Box>

      <Box className={classes.container} component='header' visibleFrom='sm'>
        <Image w={80} h={12} src={Logo} />
        <Box component='nav' className={classes.containerLinks}>
          <Anchor component={CustomNavLink} to='/'>
            Справочник
          </Anchor>
          <Anchor component={CustomNavLink} to='mission'>
            Задачи
          </Anchor>
          <Anchor component={CustomNavLink} to='team'>
            Команда
          </Anchor>
          <Anchor component={CustomNavLink} to='shop'>
            Активности
          </Anchor>
        </Box>
        <Box className={classes.containerButtons}>
          <IconContext.Provider value={{ className: classes.icon1 }}>
            <CustomActionIcon>
              <BsBell />
            </CustomActionIcon>
          </IconContext.Provider>
          <IconContext.Provider value={{ className: classes.icon2 }}>
            <CustomActionIcon component={Link} to='account'>
              <MdAccountCircle />
            </CustomActionIcon>
          </IconContext.Provider>
        </Box>
      </Box>
    </Container>
  );
};
