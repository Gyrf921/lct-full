import { Box, Container, Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getAllQuestions } from '../../API/knowledge-base/index.ts';
import { ArticlesName } from '../../API/knowledge-base/interfaces.ts';
import { BackButton } from '../../components/BackButton/BackButton.tsx';
import { ArticleList } from './ArticleList/ArticleList.tsx';

export const Questions = () => {
  useEffect(() => {
    getAllQuestions().then((values) => setQuestions(values));
  }, []);
  const [questions, setQuestions] = useState<ArticlesName[]>([]);
  return (
    <Container size='xl'>
      <Box pos='relative'>
        <BackButton variant='transparent' mb='15px'>
          Назад
        </BackButton>
        {/* <Flex w='100%' justify='space-between'>
          <Button
            fz={TextMiddle}
            p='0'
            variant='white'
            color='#5277F6'
            rightSection={<Image src={sort} />}
          >
            Сортировка
          </Button>
          <Button
            fz={TextMiddle}
            p='0'
            variant='white'
            color='#5277F6'
            rightSection={<Image src={filter} />}
          >
            Фильтр
          </Button>
        </Flex> */}
        <Flex align='center' gap='15px' direction='column' mt='20px'>
          {questions.map((item) => (
            <ArticleList article={item} key={item.id} question={true} />
          ))}
        </Flex>
      </Box>
    </Container>
  );
};
