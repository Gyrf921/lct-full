import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { addQuestion } from '../../API/admin';
import { questionData } from '../../API/admin/interfaces';
import { ArticlesName } from '../../API/knowledge-base/interfaces';
import classes from './AddQuestionModal.module.css';

interface AddQuestionModalProps {
  opened: boolean;
  close: () => void;
  updateQuestions: (questions: ArticlesName[]) => void;
}

export const AddQuestionModal = ({
  opened,
  close,
  updateQuestions,
}: AddQuestionModalProps) => {
  const handleSubmit = async (values: questionData) => {
    try {
      const data = await addQuestion(values);
      updateQuestions(data);
      close();
      form.reset();
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  const [isOpenImg, setIsOpenImg] = useState(false);
  const form = useForm({
    initialValues: {
      theme: '',
      answer: '',
      imagePath: '',
    },
    validate: {
      theme: (value) =>
        value.length > 0 ? null : 'Вопрос не может быть пустым',
      answer: (value) =>
        value.length > 0 ? null : 'Ответ не может быть пустым',
    },
  });
  return (
    <Modal
      title='Добавить вопрос'
      opened={opened}
      onClose={close}
      classNames={{ title: classes.modalTitle }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            placeholder='Вопрос'
            variant='primary'
            {...form.getInputProps('theme')}
          />
          <Textarea
            placeholder='Ответ'
            classNames={{
              root: classes.modalInputRoot,
              input: classes.modalAreaInput,
            }}
            {...form.getInputProps('answer')}
          />
          <TextInput
            display={isOpenImg ? 'block' : 'none'}
            variant='primary'
            placeholder='Ссылка на изображение'
            {...form.getInputProps('imagePath')}
          />
          <Group justify='center'>
            <Button
              rightSection={<AiOutlinePaperClip />}
              className={classes.modalButton}
              onClick={() => setIsOpenImg((isOpenImg) => !isOpenImg)}
            >
              Прикрепить файл
            </Button>
            <Button type='submit' className={classes.modalButton}>
              Сохранить
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
