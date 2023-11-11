import {
  Button,
  Flex,
  Modal,
  NativeSelect,
  NumberInput,
  TagsInput,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import classes from '../Mission/MissionAccordion/MissionAccordion.module.css';
import { TextForInput } from '../../theme/AdaptiveConts.ts';
import { RootState } from '../../store';
import { addTaskToList, updateTaskToList } from '../../API/curator';
import { task, tasksToAdd } from '../../API/hr/interfaces.ts';

interface INewTask {
  opened: boolean;
  name: string;
  close: () => void;
  task: task;
}

export const AddNewTask = ({ close, opened, name, task }: INewTask) => {
  const post = useSelector((state: RootState) => state.postName);
  const idTask = Number(useParams().articleId);
  const form = useForm({
    initialValues: {
      name: `${task.name || ''}`,
      description: `${task.description || ''}`,
      levelDifficulty: `${task.levelDifficulty || ''}`,
      postName: `${task.post || ''}`,
      imagePath: `${task.imagePath || ''}`,
      rate: `${task.rate || ''}`,
    },

    validate: {
      name: (value) =>
        /.+/.test(value)
          ? null
          : 'Название должно состоять хотя бы из 1 символа',
    },
  });
  const closePopup = () => {
    close();
    form.reset();
  };

  const TaskFunc = (data: tasksToAdd) => {
    if (name === 'Создать задание') {
      try {
        addTaskToList(data);
        closePopup();
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    }
    if (name === 'Редактировать задание') {
      try {
        updateTaskToList(data, idTask);
        closePopup();
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    }
  };

  return (
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
      title={name}
      overlayProps={{
        backgroundOpacity: 0.6,
        blur: 3,
      }}
    >
      <form
        className={classes.newstage__form}
        onSubmit={form.onSubmit((values) => {
          TaskFunc(values);
          closePopup();
        })}
      >
        <Flex gap={'xs'}>
          <TextInput
            fz={TextForInput}
            w='50%'
            classNames={{ input: classes.newstage__input }}
            placeholder='Название'
            {...form.getInputProps('name')}
          />
          <NumberInput
            fz={TextForInput}
            w='50%'
            radius='xl'
            classNames={{ input: classes.newstage__input }}
            placeholder='Сумма'
            prefix='Сумма: '
            min={1}
            {...form.getInputProps('rate')}
          />
        </Flex>
        <Textarea
          fz={TextForInput}
          radius='xl'
          w='100%'
          classNames={{
            input: classes.newstage__inputXL,
          }}
          placeholder='Описание'
          {...form.getInputProps('description')}
        />
        <Flex gap='15px'>
          <NativeSelect
            fz={TextForInput}
            radius='xl'
            w='50%'
            classNames={{
              input: classes.newstage__input,
            }}
            placeholder='Должность'
            data={post}
            {...form.getInputProps('postName')}
          />
          <NumberInput
            fz={TextForInput}
            w='50%'
            radius='xl'
            classNames={{ input: classes.newstage__input }}
            placeholder='Сложность'
            min={1}
            {...form.getInputProps('levelDifficulty')}
          />
        </Flex>
        <TextInput
          w='100%'
          placeholder='Введите ссылку на файл'
          classNames={{ input: classes.newstage__input }}
          {...form.getInputProps('imagePath')}
        />

        <Button
          fz={TextForInput}
          w='70%'
          type='submit'
          classNames={{ root: classes.newstage__button }}
        >
          {name}
        </Button>
      </form>
    </Modal>
  );
};
