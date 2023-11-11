import {
  TextInput,
  Group,
  Button,
  Flex,
  SimpleGrid,
  Card,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { Modal, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { LectureVideo } from '../../components/Lecture/LectureVideo';
import { BackButton } from '../../components/BackButton/BackButton.tsx';
import { TextForInput } from '../../theme/AdaptiveConts.ts';
import { addOneVideo } from '../../API/admin';
import { RootState } from '../../store';
import { addMedia } from '../../API/admin/interfaces.ts';
import { getAllVideo } from '../../API/knowledge-base';
import classes from './VideoLecture.module.css';

// const transformHTTP = (src) => {
//   const newHTTP = src.split('live').join('embed');
//   return newHTTP;
// };
//
// console.log(
//   transformHTTP('https://www.youtube.com/live/jfKfPfyJRdk?si=kJdDHKPBBEgw8fTm')
// );

export const VideoLecture = () => {
  const [videos, setVideos] = useState([]);
  const role = useSelector((state: RootState) => state.roles);
  const post = useSelector((state: RootState) => state.postName);

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      videoName: '',
    },
  });

  const formVideo = useForm<addMedia>({
    initialValues: {
      description: '',
      name: '',
      url: '',
      postName: '',
    },

    validate: {
      name: (value) =>
        /.+/.test(value)
          ? null
          : 'Название должно состоять хотя бы из 1 символа',
    },
  });

  useEffect(() => {
    Promise.all([getAllVideo()])
      .then(([res]) => {
        setVideos(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (data: addMedia) => {
    addOneVideo(data);
  };

  const closePopup = () => {
    close();
    formVideo.reset();
  };

  return (
    <>
      <Flex direction='column' align='center' bg='#FFF' mt='30px'>
        <Flex w='100%' justify='space-between' align='flex-end'>
          <form
            onSubmit={form.onSubmit((values) => {
              closePopup();
            })}
          >
            <TextInput
              w='100%'
              classNames={{ input: classes.videolecture__input }}
              placeholder='Введите ключевые слова'
              {...form.getInputProps('videoName')}
            />

            <Group justify='flex-start' mt='md'>
              <Button
                className={`${classes.videolecture__button} ${classes.videolecture__buttonSearch}`}
                type='submit'
              >
                Найти
              </Button>
              <Button className={classes.videolecture__button} type='button'>
                Очистить
              </Button>
            </Group>
          </form>
          <BackButton>Назад</BackButton>
        </Flex>
        {role[0] === 'ROLE_HR' || role[0] === 'ROLE_ADMIN' ? (
          <Flex w='100%' mt='20px'>
            <Button
              variant='white'
              color='#5277F6'
              rightSection={<AiOutlinePaperClip />}
              onClick={open}
            >
              Добавить видео
            </Button>
          </Flex>
        ) : (
          ''
        )}
        <SimpleGrid
          cols={{ lg: 3, md: 2, sm: 2, base: 1 }}
          justify='flex-start'
          align='flex-start'
          gutter='30px'
          m='10px 0 140px'
        >
          {videos.map((video) => (
            <Card key={video?.id}>
              <LectureVideo video={video} />
            </Card>
          ))}
        </SimpleGrid>
      </Flex>
      <Modal
        radius='32px'
        fz={TextForInput}
        opened={opened}
        onClose={() => {
          closePopup();
        }}
        centered
        title='Добавить видео'
        overlayProps={{
          backgroundOpacity: 0.6,
          blur: 3,
        }}
      >
        <form
          className={classes.videolecture__form}
          onSubmit={formVideo.onSubmit((values) => {
            handleSubmit(values);
            closePopup();
          })}
        >
          <TextInput
            w='100%'
            fz={TextForInput}
            classNames={{ input: classes.videolecture__input }}
            placeholder='Название'
            {...formVideo.getInputProps('name')}
          />
          <Textarea
            w='100%'
            fz={TextForInput}
            classNames={{ input: classes.videolecture__input }}
            placeholder='Описание'
            {...formVideo.getInputProps('description')}
          />
          <TextInput
            w='100%'
            fz={TextForInput}
            classNames={{ input: classes.videolecture__input }}
            placeholder='Ссылка'
            {...formVideo.getInputProps('url')}
          />
          <Select
            withCheckIcon={false}
            w='100%'
            placeholder='Должность'
            fz={TextForInput}
            classNames={{ input: classes.videolecture__input }}
            data={post}
            {...formVideo.getInputProps('postName')}
          />
          <Button w='55%' type='submit' fz={TextForInput}>
            Добавить видео
          </Button>
        </form>
      </Modal>
    </>
  );
};
