import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mantine/core';
import { ProfileCard } from '../../ProfileCard/ProfileCard.tsx';
import { getInternById } from '../../../API/team';
import { employeeIntern } from '../../../API/team/interfaces.ts';
import { MaBody } from './MABody/MABody.tsx';

export const MissionAdmin = () => {
  const [intern, setIntern] = useState<employeeIntern>({});
  const [isLoading, setIsLoading] = useState(true);
  const id = useParams();
  useEffect(() => {
    Promise.all([getInternById(id.articleId)])
      .then(([res]) => {
        setIntern(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [id.articleId]);

  return (
    <>
      {isLoading ? (
        'Wait plz'
      ) : (
        <Container size='xl'>
          <ProfileCard intern={intern} />
          <MaBody />
        </Container>
      )}
    </>
  );
};
