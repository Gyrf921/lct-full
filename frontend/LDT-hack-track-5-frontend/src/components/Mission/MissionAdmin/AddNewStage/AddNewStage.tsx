import {
  Button,
  Flex,
  Image,
  Modal,
  NumberInput,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import {
  Image40,
  TextForInput,
  TextMiddle,
} from '../../../../theme/AdaptiveConts.ts';
import plus from '../../../../assets/icon/add_circle_create_expand_new_plus_icon_123218 1.png';
import classes from '../../MissionAccordion/MissionAccordion.module.css';
import { addStageToIntern } from '../../../../API/curator';
import { addStage } from '../../../../API/hr/interfaces.ts';

export const AddNewStage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const idIntern = Number(useParams().articleId);

  const form = useForm({
    initialValues: {
      deadline: '',
      name: '',
      levelDifficulty: '',
      tasksId: [],
    },

    validate: {
      deadline: (value) => (/.+/.test(value) ? null : 'Нужно выбрать дату'),
      name: (value) =>
        /.+/.test(value)
          ? null
          : 'Название должно состоять хотя бы из 1 символа',
      levelDifficulty: (value) =>
        /.+/.test(value) ? null : 'Установите на каком месте будет этап',
    },
  });

  const closePopup = () => {
    close();
    form.reset();
  };
  const addNewStageFunc = (data: addStage) => {
    console.log(data, idIntern);
    try {
      addStageToIntern(data, idIntern);
      closePopup();
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  return (
    <>
      <>
        <Flex
          align='center'
          justify='center'
          w='100%'
          mih='200px'
          className={classes.missionAccordion__admin}
        >
          <Button
            onClick={open}
            justify='space-around'
            fz={TextMiddle}
            maw='400px'
            className={classes.buttonAddStage}
            rightSection={<Image src={plus} w={Image40} h={Image40} />}
          >
            Добавить этап
          </Button>
        </Flex>
        <Modal
          radius='32px'
          fz={TextForInput}
          classNames={{
            title: classes.newstage__title,
            content: classes.newstage,
          }}
          opened={opened}
          onClose={() => {
            closePopup();
          }}
          centered
          title='Добавить этап'
          overlayProps={{
            backgroundOpacity: 0.6,
            blur: 3,
          }}
        >
          <form
            className={classes.newstage__form}
            onSubmit={form.onSubmit((values) => {
              addNewStageFunc(values);
              closePopup();
            })}
          >
            <DateInput
              w='100%'
              fz={TextForInput}
              classNames={{ input: classes.newstage__input }}
              placeholder='Сроки выполнения до:'
              valueFormat='Сроки выполнения до: DD.MM.YYYY'
              {...form.getInputProps('deadline')}
            />
            <TextInput
              w='100%'
              fz={TextForInput}
              classNames={{ input: classes.newstage__input }}
              placeholder='Название'
              {...form.getInputProps('name')}
            />
            <NumberInput
              fz={TextForInput}
              w='100%'
              radius='xl'
              classNames={{ input: classes.newstage__input }}
              placeholder='Порядок'
              min={1}
              {...form.getInputProps('levelDifficulty')}
            />
            <Button
              w='55%'
              type='submit'
              fz={TextForInput}
              classNames={{ root: classes.newstage__button }}
            >
              Создать этап
            </Button>
          </form>
        </Modal>
      </>
    </>
  );
};
