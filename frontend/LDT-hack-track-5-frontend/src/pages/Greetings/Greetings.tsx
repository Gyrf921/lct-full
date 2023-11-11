import { Button, Container, Flex, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { HeadingH3 } from '../../theme/AdaptiveConts.ts';
import classes from './Greetings.module.css';

export const Greetings = () => {
  return (
    <Container>
      <Flex className={classes.greetings} h='100vh' gap='30px'>
        <Text className={classes.greetings__text} fz={HeadingH3}>
          Добро пожаловать!
          Начни&nbsp;свой&nbsp;путь&nbsp;вместе&nbsp;с&nbsp;нами
        </Text>
        <Button
          maw='500px'
          w={{ lg: '245px', md: '230px', sm: '200px', base: '175px' }}
          h={{ lg: '75px', md: '65px', sm: '55px', base: '45px' }}
          className={classes.greetings__button}
          component={NavLink}
          to='/register'
        >
          Регистрация
        </Button>
        <Button
          w={{ lg: '245px', md: '230px', sm: '200px', base: '175px' }}
          h={{ lg: '75px', md: '65px', sm: '55px', base: '45px' }}
          className={classes.greetings__button}
          component={NavLink}
          to='/login'
        >
          Вход
        </Button>
        <Button
          color='#dba1ed'
          w={{ lg: '280px', md: '280px', sm: '280px', base: '280px' }}
          h={{ lg: '75px', md: '65px', sm: '55px', base: '45px' }}
          className={classes.greetings__button}
          component={NavLink}
          to='/company-register'
        >
          Зарегестрировать компанию
        </Button>
      </Flex>
    </Container>
  );
};
