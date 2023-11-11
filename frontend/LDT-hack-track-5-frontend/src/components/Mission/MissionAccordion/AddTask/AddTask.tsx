import { Button, Image, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { AxiosError } from 'axios';

import plus from '../../../../assets/icon/add_circle_create_expand_new_plus_icon_123218 1.png';
import classes from '../../MissionAccordion/MissionAccordion.module.css';
import {
  EditButton,
  Image40,
  TextForInput,
  TextMiddle,
} from '../../../../theme/AdaptiveConts.ts';
import { addTaskToStage } from '../../../../API/curator';
import { allTaskAndStage, task } from '../../../../API/hr/interfaces.ts';

interface AddTask {
  internId: number;
  allTasks: task[];
  stage: allTaskAndStage;
}

export const AddTask = ({ internId, allTasks, stage }: AddTask) => {
  const [taskValue, setTaskValue] = useState('17 asdsdfa');
  const [opened, { open, close }] = useDisclosure(false);
  const newTask = allTasks
    .map((task) => `${task.taskId} ${task.name}`)
    .sort((a, b) => {
      const taskIdA = parseInt(a.split(' ')[0], 10);
      const taskIdB = parseInt(b.split(' ')[0], 10);

      return taskIdA - taskIdB;
    });
  const taskForSearch = Number(taskValue.split(' ')[0]);

  const handleSubmit = () => {
    try {
      addTaskToStage(taskForSearch, stage.stage.stageId, taskForSearch);
      closePopup();
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  const form = useForm({
    initialValues: {
      task: taskForSearch,
    },
  });

  const addTaskFunc = () => {
    try {
      addTaskToStage(data, internId, taskId);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };
  const closePopup = () => {
    close();
    form.reset();
  };
  return (
    <>
      <Button
        align='center'
        justify='center'
        bg='transparent'
        w='100%'
        h={EditButton}
        className={classes.addTask}
        onClick={open}
      >
        <Button
          classNames={{
            root: classes.addTaskButton,
            label: classes.addTaskLabel,
          }}
          fz={TextMiddle}
          rightSection={<Image src={plus} w={Image40} h={Image40} />}
        >
          Добавить задание
        </Button>
      </Button>
      <Modal
        radius='32px'
        fz={TextForInput}
        classNames={{
          title: classes.newstage__title,
          content: classes.newstage,
        }}
        opened={opened}
        onClose={() => {
          closePopup();
        }}
        centered
        title='Добавить задание'
        overlayProps={{
          backgroundOpacity: 0.6,
          blur: 3,
        }}
      >
        <form
          className={classes.newstage__form}
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Select
            withCheckIcon={false}
            w='100%'
            placeholder='Выберете задачу'
            fz={TextForInput}
            classNames={{ input: classes.newstage__input }}
            data={newTask}
            onChange={setTaskValue}
          />
          <Button
            w='55%'
            type='submit'
            fz={TextForInput}
            classNames={{ root: classes.newstage__button }}
          >
            Добавить задание
          </Button>
        </form>
      </Modal>
    </>
  );
};
