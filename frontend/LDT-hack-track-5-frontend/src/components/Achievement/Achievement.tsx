import { Box, Image, Text } from '@mantine/core';
import classes from './Achievement.module.css';

interface Achievement {
  title: string;
  text: string;
  image: string;
  completed: boolean;
}

export const Achievement = ({ title, text, image, completed }: Achievement) => {
  return (
    <Box
      className={
        !completed
          ? `${classes.notCompleted} ${classes.achievement}`
          : `${classes.achievement}`
      }
    >
      <Image className={classes.image} src={image} />
      <Text className={classes.title}>{title}</Text>
      <Text className={classes.text}>{text}</Text>
    </Box>
  );
};
