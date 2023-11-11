import { Box, Container, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPersonalData } from '../../API/personal-account';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { CardAchievement } from '../../modules/CardAchievement/CardAchievement';
import { Diagram } from '../../modules/Diagram/Diagram';
import { Events } from '../../modules/Events/Events';
import { Tracker } from '../../modules/Tracker/Tracker';
import { RootState } from '../../store';

export const Account = () => {
  const roles = useSelector((state: RootState) => state.roles);
  const superRoles = ['ROLE_ADMIN', 'ROLE_HR', 'ROLE_CURATOR'];
  const isSuper = superRoles.some((item) => roles.includes(item));

  useEffect(() => {
    setLoading(true);
    getPersonalData().then((value) => {
      setPerson(value);
      setLoading(false);
    });
  }, []);
  const [person, setPerson] = useState();
  const [loading, setLoading] = useState(true);
  if (loading) {
    return loading;
  }
  return (
    <>
      <Container size='xl'>
        <ProfileCard intern={person} />
        <Box mt={25}>
          <CardAchievement />
        </Box>
        <Group mt={25} justify='space-between'>
          <Box display={isSuper ? 'none' : 'block'} style={{ flexGrow: 1 }}>
            <Tracker />
          </Box>
          <Diagram />
        </Group>
        <Box display={isSuper ? 'none' : 'block'}>
          <Events />
        </Box>
      </Container>
    </>
  );
};
