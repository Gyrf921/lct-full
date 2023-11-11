import {
  Autocomplete,
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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateArticle } from '../../API/admin';
import { articleData } from '../../API/admin/interfaces';
import { RootState } from '../../store';
import classes from './AddArticleModal.module.css';

interface ArticleEditModalProps {
  opened: boolean;
  close: () => void;
  id: number;
}

export const ArticleEditModal = ({
  opened,
  close,
  id,
}: ArticleEditModalProps) => {
  const navigate = useNavigate();
  const handleSubmit = async (values: articleData) => {
    try {
      const data = await updateArticle(id, values);
      close();
      form.reset();
      navigate(0);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  const [isOpenImg, setIsOpenImg] = useState(false);
  const posts = useSelector((state: RootState) => state.postName);
  const form = useForm({
    initialValues: {
      theme: '',
      information: '',
      postName: '',
      imagePath: '',
    },
    validate: {
      theme: (value) =>
        value.length > 0 ? null : 'Название не может быть пустым',
      postName: (value) =>
        posts.includes(value) ? null : 'Такой должности не существует',
      information: (value) =>
        value.length > 0 ? null : 'Описание не может быть пустым',
    },
  });
  return (
    <Modal
      title='Редактировать статью'
      opened={opened}
      onClose={close}
      classNames={{ title: classes.modalTitle }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            placeholder='Название'
            variant='primary'
            {...form.getInputProps('theme')}
          />
          <Autocomplete
            placeholder='Должность'
            variant='primary'
            data={posts}
            {...form.getInputProps('postName')}
          />
          <Textarea
            placeholder='Описание'
            classNames={{
              root: classes.modalInputRoot,
              input: classes.modalAreaInput,
            }}
            {...form.getInputProps('information')}
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
