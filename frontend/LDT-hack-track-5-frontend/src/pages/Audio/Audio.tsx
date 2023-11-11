import { Button, Container, Group, Stack, TextInput } from '@mantine/core';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Modal, Select, Textarea } from '@mantine/core';
import { BackButton } from '../../components/BackButton/BackButton';
import { AudioItem } from '../../components/AudioItem/AudioItem';
import { TextForInput } from '../../theme/AdaptiveConts.ts';
import classes from '../../modules/VideoLecture/VideoLecture.module.css';

export const Audio = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const formAudio = useForm({
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

  const closePopup = () => {
    close();
    formAudio.reset();
  };
  return (
    <>
      <Container size='xl'>
        <TextInput variant='primary' placeholder='Найти аудио' />
        <Group justify='space-between'>
          <Button rightSection={<AiOutlinePaperClip />} variant='white' my={15}>
            Добавить аудио
          </Button>
          <BackButton>Назад</BackButton>
        </Group>
        <Stack>
          <AudioItem />
          <AudioItem />
          <AudioItem />
          <AudioItem />
          <AudioItem />
        </Stack>
      </Container>
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
          onSubmit={formAudio.onSubmit((values) => {
            console.log(values);
            closePopup();
          })}
        >
          <TextInput
            w='100%'
            fz={TextForInput}
            classNames={{ input: classes.videolecture__input }}
            placeholder='Название'
            {...formAudio.getInputProps('name')}
          />
          <Textarea
            w='100%'
            fz={TextForInput}
            classNames={{ input: classes.videolecture__input }}
            placeholder='Описание'
            {...formAudio.getInputProps('description')}
          />
          <TextInput
            w='100%'
            fz={TextForInput}
            classNames={{ input: classes.videolecture__input }}
            placeholder='Ссылка'
            {...formAudio.getInputProps('url')}
          />
          <Select
            withCheckIcon={false}
            w='100%'
            placeholder='Должность'
            fz={TextForInput}
            classNames={{ input: classes.videolecture__input }}
            data={['', 'React', 'Angular', 'Vue', 'Svelte']}
            {...formAudio.getInputProps('postName')}
          />
          <Button w='55%' type='submit' fz={TextForInput}>
            Создать этап
          </Button>
        </form>
      </Modal>
    </>
  );
};
