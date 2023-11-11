import { Box, Button, Card, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllQuestions } from '../../API/knowledge-base';
import { ArticlesName } from '../../API/knowledge-base/interfaces';
import { RootState } from '../../store';
import { setError } from '../../store/userSlice';
import { AddQuestionModal } from '../AddQuestionModal/AddQuestionModal';
import { EditButton } from '../EditButton/EditButton';
import { ScrollAreaCard } from '../ScrollAreaCard/ScrollAreaCard';
import classes from './CompanyInfoCard.module.css';

export const CompanyInfoCard = () => {
  useEffect(() => {
    getAllQuestions()
      .then((values) => {
        setArticles(values);
      })
      .catch((error) => {
        const err = error as AxiosError;
        dispatch(setError(err.response?.data.message));
      });
  }, []);
  const dispatch = useDispatch();
  const [articles, setArticles] = useState<ArticlesName[]>([]);
  const [opened, { open, close }] = useDisclosure();
  const roles = useSelector((state: RootState) => state.roles);
  const isAdmin = roles.includes('ROLE_ADMIN');

  return (
    <Card className={classes.card}>
      <Box className={classes.wrapper}>
        <Group justify='space-between' mb='lg'>
          <Group>
            <IconContext.Provider value={{ className: classes.icon }}>
              <AiOutlineInfoCircle />
            </IconContext.Provider>
            <Title order={2}>О компании</Title>
          </Group>
          <EditButton display={isAdmin ? 'flex' : 'none'} onClick={open} />
          <AddQuestionModal
            opened={opened}
            close={close}
            updateQuestions={(questions) => setArticles(questions)}
          />
        </Group>
        <ScrollAreaCard
          articles={articles}
          question={true}
          mah={isAdmin ? { base: 500, md: 1200 } : 500}
        />
      </Box>

      <Box>
        <Button
          fullWidth
          mt='lg'
          radius='xl'
          variant='filled'
          component={Link}
          to={'/questions'}
        >
          Все статьи
        </Button>
      </Box>
    </Card>
  );
};
