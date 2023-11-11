import { Box, Container, Image, Text, Title } from '@mantine/core';
import { useLoaderData } from 'react-router-dom';
import { Question as IQuestion } from '../../API/knowledge-base/interfaces';
import { BackButton } from '../../components/BackButton/BackButton';
import { QuestionModal } from '../../modules/QuestionModal/QuestionModal';
import classes from './Article.module.css';

export const Question = () => {
  const { theme, answer, imagePath, questionId } = useLoaderData() as IQuestion;

  return (
    <>
      <Container size='xl'>
        <Box pos='relative'>
          <BackButton variant='transparent'>Назад</BackButton>
          <Box className={classes.box}>
            <QuestionModal id={questionId} />
          </Box>
          <Title>{theme}</Title>
          <Text>{answer}</Text>
          {imagePath && <Image src={imagePath} w='50%' h='auto' />}
        </Box>
      </Container>
    </>
  );
};
