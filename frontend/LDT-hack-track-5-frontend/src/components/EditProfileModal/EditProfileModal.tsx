import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { updatePersonalData } from '../../API/personal-account';
import {
  EmployeeData,
  updatePersonal,
} from '../../API/personal-account/interfaces';

interface EditProfileModalProps {
  opened: boolean;
  close: () => void;
  intern: EmployeeData;
}

export const EditProfileModal = ({
  opened,
  close,
  intern,
}: EditProfileModalProps) => {
  const handleSubmit = async (values: updatePersonal) => {
    try {
      const data = await updatePersonalData(values);
      close();
      form.reset();
      navigate(0);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  const navigate = useNavigate();
  const [isOpenImg, setIsOpenImg] = useState(false);
  const form = useForm({
    initialValues: {
      name: intern.name || '',
      city: intern.city || '',
      socialNetwork: intern.socialNetwork || '',
      imagePath: intern.imagePath || '',
      phone: intern.phone || '',
    },
    validate: {
      name: (value) => (value.length > 0 ? null : 'Имя не может быть пустым'),
      city: (value) => (value.length > 0 ? null : 'Город не может быть пустым'),
    },
  });
  return (
    <Modal title='Редактировать профиль' opened={opened} onClose={close}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            placeholder='Имя'
            variant='primary'
            {...form.getInputProps('name')}
          />
          <TextInput
            placeholder='Город'
            variant='primary'
            {...form.getInputProps('city')}
          />
          <TextInput
            placeholder='Соцсеть'
            variant='primary'
            {...form.getInputProps('socialNetwork')}
          />
          <TextInput
            placeholder='Телефон'
            variant='primary'
            {...form.getInputProps('phone')}
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
              onClick={() => setIsOpenImg((isOpenImg) => !isOpenImg)}
            >
              Прикрепить файл
            </Button>
            <Button type='submit'>Сохранить</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
