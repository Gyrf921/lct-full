import { Container } from '@mantine/core';
import { useSelector } from 'react-redux';
import { Mission } from '../../components/Mission/Mission.tsx';
import { RootState } from '../../store/index.ts';
import { TaskContainer } from '../TaskContainer/TaskContainer.tsx';

export const MissionPage = () => {
  const role = useSelector((state: RootState) => state.roles);

  if (role.includes('ROLE_ADMIN')) {
    return (
      <Container size='xl'>
        <TaskContainer />
      </Container>
    );
  }

  if (role.includes('ROLE_INTERN')) {
    return (
      <Container size='xl'>
        <Mission />
      </Container>
    );
  }
};
