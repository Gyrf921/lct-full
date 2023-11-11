import { Button, Flex, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import classes from '../Mission/MissionAccordion/MissionAccordion.module.css';
import Trash from '../../assets/images/TrashBin.png';
import { Image40, TextMiddle } from '../../theme/AdaptiveConts.ts';
import { task } from '../../API/hr/interfaces.ts';

interface ITask {
  task: task;
  isEditing: boolean;
}

export const Task = ({ task, isEditing }: ITask) => {
  const [isDeleted, setIsDeleted] = useState(false);
  if (isEditing) {
    return (
      <>
        <Flex
          justify={'space-between'}
          align={'center'}
          className={`${classes.missionAccordion__EditingTaskRoot} ${
            isDeleted ? classes.missionAccordion__EditingTaskRoot_delete : ''
          }`}
        >
          <Text
            truncate='end'
            maw='60%'
            pl='10px'
            fz={TextMiddle}
            className={classes.missionAccordion__EditingTask}
          >
            {task.name}
          </Text>
          <Flex
            gap={{ sm: '40px', xs: '15px', base: '15px' }}
            direction={{ xs: 'row', base: 'column' }}
            align={'center'}
          >
            <Text
              fz={TextMiddle}
              className={classes.missionAccordion__EditingTask}
              component={Link}
              to={`/tasks/${task.taskId}`}
            >
              Изменить
            </Text>
            <Button
              p='0'
              onClick={() => setIsDeleted(true)}
              bg='transparent'
              rightSection={<Image src={Trash} w={Image40} h={Image40} />}
            ></Button>
          </Flex>
        </Flex>
      </>
    );
  } else {
    return (
      <>
        <Flex
          justify={'space-between'}
          align={'center'}
          className={classes.missionAccordion__EditingTaskRoot}
        >
          <Text
            truncate='end'
            w='60%'
            pl='10px'
            fz={TextMiddle}
            className={classes.missionAccordion__EditingTask}
          >
            {task.name}
          </Text>
        </Flex>
      </>
    );
  }
};
