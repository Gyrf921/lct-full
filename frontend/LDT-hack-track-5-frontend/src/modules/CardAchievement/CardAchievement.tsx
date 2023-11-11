import { Box, Card } from '@mantine/core';
import { Achievement } from '../../components/Achievement/Achievement';
import { achievements } from '../../mock/Achievements';
import classes from './CardAchievement.module.css';

export const CardAchievement = () => {
  return (
    <Card className={classes.card}>
      <Box className={classes.group}>
        {achievements.map((item) => (
          <Achievement
            key={item.id}
            title={item.title}
            text={item.text}
            image={item.image}
            completed={item.completed}
          />
        ))}
      </Box>
      <Box className={classes.wrapperButton}></Box>
    </Card>
  );
};
