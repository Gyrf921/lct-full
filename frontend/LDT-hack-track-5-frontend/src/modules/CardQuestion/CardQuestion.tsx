import {
  Button,
  Card,
  Flex,
  Image,
  Modal,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates/lib';
import {
  Heading,
  HeadingH3,
  TextForInput,
  TextMiddle,
} from '../../theme/AdaptiveConts.ts';
import Question from '../../assets/icon/QuestionSupport.svg';
import classes from './CardQuestion.module.css';

export const CardQuestion = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      question: '',
    },

    validate: {
      question: (value) =>
        /.+/.test(value) ? null : 'Вопрос должен содержать хотя бы 1 символ',
    },
  });

  const closePopup = () => {
    close();
    form.reset();
  };

  return (
    <>
      <Card className={classes.cardQuestion}>
        <Flex direction='column'>
          <Text fz={Heading} className={classes.cardQuestion__title}>
            Остались вопросы?
          </Text>
          <Text fz={HeadingH3} className={classes.cardQuestion__text}>
            Задай нашим специалистам вопрос в форме обратной связи
          </Text>
          <Button
            onClick={open}
            fz={TextMiddle}
            variant='white'
            color='#5277F6'
            w={{ xs: '200px', base: '150px' }}
          >
            Задать вопрос
          </Button>
        </Flex>
        <Image
          src={Question}
          w={{ lg: '346px', md: '300px', xs: '200px', base: '150px' }}
        />
      </Card>
      <Modal
        radius='32px'
        fz={TextForInput}
        opened={opened}
        onClose={() => {
          closePopup();
        }}
        centered
        title='Задать вопрос'
        overlayProps={{
          backgroundOpacity: 0.6,
          blur: 3,
        }}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            console.log(values);
            closePopup();
          })}
        >
          <Textarea
            w='100%'
            fz={TextForInput}
            radius='lg'
            classNames={{ input: classes.cardQuestion__input }}
            placeholder='Ваш вопрос'
            {...form.getInputProps('question')}
          />
          <Button w='55%' type='submit' fz={TextForInput} mt='20px'>
            Задать вопрос
          </Button>
        </form>
      </Modal>
    </>
  );
};
