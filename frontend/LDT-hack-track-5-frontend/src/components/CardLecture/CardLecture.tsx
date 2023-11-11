import { Box, Button, Card, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './CardLecture.module.css';

interface CardLectureProps {
  type: 'audio' | 'video';
}

export const CardLecture = ({ type }: CardLectureProps) => {
  return (
    <Card className={classes.card}>
      <Group justify='space-between'>
        <Text className={classes.text}>
          {type === 'audio' ? 'Курс аудиолекций' : 'Курс видеолекций'}
        </Text>
      </Group>
      <Box className={classes.wrapper}>
        <Button
          variant='outline'
          className={classes.button}
          component={Link}
          to={`/${type}`}
        >
          Начать
        </Button>
      </Box>
    </Card>
  );
};
