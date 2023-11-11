import { Container, Flex, Text } from '@mantine/core';
import { BackButton } from '../../components/BackButton/BackButton.tsx';
import { HeadingH2 } from '../../theme/AdaptiveConts.ts';
import classes from './PagesNotFound.module.css';

export const PagesNotFound = () => {
  return (
    <Container align='center'>
      <Flex
        direction='column'
        h='100vh'
        align={'flex-start'}
        justify={'center'}
        maw='600px'
        gap='20px'
      >
        <BackButton className={classes.pnf__button}>Назад</BackButton>
        <Text fz={HeadingH2} maw='600px' className={classes.pnf__title}>
          Такой страницы не&nbsp;сущетсвует
        </Text>
      </Flex>
    </Container>
  );
};
