import {
  Flex,
  Button,
  Text,
  Image,
  SimpleGrid,
  Textarea,
  Container,
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import coin from '../../../assets/icon/coin.svg';
import { AddNewTask } from '../../Task/AddNewTask.tsx';
import {
  EditButton,
  HeadingH2,
  HeadingH3,
  Image40,
  TextForInput,
  TextMiddle,
} from '../../../theme/AdaptiveConts.ts';
import { BackButton } from '../../BackButton/BackButton.tsx';
import { getCompanyTaskById } from '../../../API/company';
import { RootState } from '../../../store';
import { answerData } from '../../../API/intern/interfaces.ts';
import { setAnswerToTask } from '../../../API/intern';
import { task } from '../../../API/hr/interfaces.ts';
import classes from './PopupMission.module.css';

export const PopupMission = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [task, setTask] = useState<task>({});
  const [isLoading, setIsLoading] = useState(true);
  const taskID = Number(useParams().articleId);
  useEffect(() => {
    Promise.all([getCompanyTaskById(taskID)])
      .then(([res]) => {
        setTask(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const formAnswer = useForm({
    initialValues: {
      answerUrl: '',
    },
  });

  const postAnswer = (data: answerData) => {
    try {
      setAnswerToTask(taskID, data);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  const role = useSelector((state: RootState) => state.roles[0]);
  return (
    <>
      {isLoading ? (
        'wait'
      ) : (
        <Container size='xl'>
          <Flex className={classes.popupMission} direction='column'>
            <Flex>
              <Flex className={classes.popupMission__container}>
                <Flex
                  className={classes.popupMission__box}
                  gap='10px'
                  direction={{ xs: 'row', base: 'column' }}
                >
                  <BackButton>Назад</BackButton>
                  <Text className={classes.popupMission__title} fz={HeadingH2}>
                    {task.name}
                  </Text>
                  <Flex className={classes.popupMission__bag}>
                    <Image src={coin} w={Image40} h={Image40} />
                    <Text
                      className={classes.popupMission__coin}
                      fz={TextMiddle}
                    >
                      {task.rate} монет
                    </Text>
                  </Flex>
                </Flex>
                <Flex className={classes.popupMission__containerText}>
                  <Text className={classes.popupMission__text} fz={TextMiddle}>
                    {task.description}
                  </Text>
                </Flex>
                <SimpleGrid cols={{ lg: 2, sm: 2, base: 1 }} mb='40px'>
                  <Image src={task.imagePath} radius='30px' />
                </SimpleGrid>
              </Flex>
            </Flex>
            {role === 'ROLE_ADMIN' || role === 'ROLE_HR' ? (
              <>
                <Button
                  classNames={{
                    root: classes.popupMission__editRoot,
                    inner: classes.popupMission__editInner,
                  }}
                  variant='filled'
                  mt='40px'
                  p='0'
                  color='#5277F6'
                  onClick={open}
                  h={EditButton}
                >
                  Редактировать
                </Button>
              </>
            ) : (
              <form
                className={classes.popupMission__form}
                onSubmit={formAnswer.onSubmit((values) => {
                  postAnswer(values);
                  formAnswer.reset();
                })}
              >
                <Textarea
                  w='70%'
                  fz={TextForInput}
                  classNames={{ input: classes.popupMission__textArea }}
                  radius='lg'
                  placeholder={'Добавьте ответ на вопрос'}
                  {...formAnswer.getInputProps('answerUrl')}
                />
                <Button w='40%' type='submit' fz={TextForInput}>
                  Отправить
                </Button>
              </form>
            )}
          </Flex>
          <AddNewTask
            task={task}
            opened={opened}
            name={'Редактировать задание'}
            close={close}
          />
        </Container>
      )}
    </>
  );
};
