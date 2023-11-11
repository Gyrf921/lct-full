import { ActionIcon, Box, Button, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AxiosError } from 'axios';
import { BsTrash3 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteArticle } from '../../API/admin';
import { RootState } from '../../store';
import { setError } from '../../store/userSlice';
import classes from './ArticleDeleteModal.module.css';

export interface ArticleModalProps {
  id: number;
}

export const ArticleDeleteModal = ({ id }: ArticleModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const roles = useSelector((state: RootState) => state.roles);
  const isAdmin = roles.includes('ROLE_ADMIN');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = async (id: number) => {
    try {
      await deleteArticle(id);
      navigate(-1);
    } catch (error) {
      const err = error as AxiosError;
      dispatch(setError(err.response?.data.message));
    }
  };

  return (
    <>
      <Box display={isAdmin ? 'block' : 'none'}>
        <ActionIcon variant='unstyled' c='red' onClick={open}>
          <BsTrash3 />
        </ActionIcon>
        <Modal opened={opened} onClose={close}>
          <Stack align='center'>
            <Text className={classes.modalText}>
              Вы уверены, что хотите удалить эту статью?
            </Text>
            <Button
              onClick={() => handleClick(id)}
              className={classes.modalButton}
            >
              Удалить
            </Button>
          </Stack>
        </Modal>
      </Box>
    </>
  );
};
