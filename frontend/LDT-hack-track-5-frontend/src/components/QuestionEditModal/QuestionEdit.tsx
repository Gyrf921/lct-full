import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { QuestionEditModal } from './QuestionEditModal';

export interface QuestionModalProps {
  id: number;
}

export const QuestionEdit = ({ id }: QuestionModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const roles = useSelector((state: RootState) => state.roles);
  const isAdmin = roles.includes('ROLE_ADMIN');

  return (
    <>
      <Button
        display={isAdmin ? 'block' : 'none'}
        variant='white'
        onClick={open}
      >
        Редактировать
      </Button>
      <QuestionEditModal opened={opened} close={close} id={id} />
    </>
  );
};
