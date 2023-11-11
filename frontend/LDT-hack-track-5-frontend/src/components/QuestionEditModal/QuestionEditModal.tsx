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
import { useNavigate } from 'react-router-dom';
import { updateQuestion } from '../../API/admin';
import { questionData } from '../../API/admin/interfaces';
import classes from './AddArticleModal.module.css';

interface QuestionEditModalProps {
  opened: boolean;
  close: () => void;
  id: number;
}

export const QuestionEditModal = ({
  opened,
  close,
  id,
}: QuestionEditModalProps) => {
  const navigate = useNavigate();
  const handleSubmit = async (values: questionData) => {
    try {
      const data = await updateQuestion(id, values);
      close();
      form.reset();
      navigate(0);
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
      title='Изменить вопрос'
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
