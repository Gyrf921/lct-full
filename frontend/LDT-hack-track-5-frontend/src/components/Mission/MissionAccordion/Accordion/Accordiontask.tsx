import { Link } from 'react-router-dom';
import { Button, Flex, Image, Text } from '@mantine/core';
import classes from '../MissionAccordion.module.css';
import Check from '../../../../assets/icon/check-circle.svg';
import Trash from '../../../../assets/images/TrashBin.png';
import {
  EditButton,
  Image40,
  Image50,
  TextForInput,
  TextLarge,
  TextMiddle,
  TextSmall,
} from '../../../../theme/AdaptiveConts.ts';
import { taskStage } from '../../../../API/hr/interfaces.ts';

interface IAccordionTask {
  task: taskStage;
  isEditing: boolean;
}
export const Accordiontask = ({ task, isEditing }: IAccordionTask) => {
  if (isEditing) {
    return (
      <Flex
        justify={'space-between'}
        align={'center'}
        h={EditButton}
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
        <Text
          fz={TextForInput}
          className={classes.missionAccordion__EditingTask}
          component={Link}
          to={`/tasks/${task.taskId}`}
        >
          Изменить
        </Text>
        <Button
          mr='10px'
          p='0'
          bg='transparent'
          rightSection={<Image src={Trash} w={Image40} h={Image40} />}
        ></Button>
      </Flex>
    );
  }

  if (!isEditing) {
    return (
      <Button
        fz={TextMiddle}
        classNames={{
          root: classes.missionAccordion__taskRoot,
          inner: classes.missionAccordion__task,
          label: classes.missionAccordion__labelButton,
        }}
        component={Link}
        to={`/tasks/${task.taskId}`}
        rightSection={
          <Flex align='center' gap='10px'>
            <Text
              fz={TextSmall}
              className={`${
                task.status === 'Принято'
                  ? classes.missionAccordion__statusAp
                  : classes.missionAccordion__statusDn
              }  `}
            >
              {task.status}
              {/*{task.time}*/}
            </Text>
            {task.status === 'Принято' ? (
              <Image src={Check} w={Image40} h={Image50} />
            ) : (
              ''
            )}
          </Flex>
        }
      >
        <Text
          // truncate='end'
          pl='10px'
          fz={TextLarge}
          // maw={{ lg: '600px', sm: '500px', base: '350px' }}
          className={classes.missionAccordion__EditingTask}
        >
          {task.name}
        </Text>
      </Button>
    );
  }
};
