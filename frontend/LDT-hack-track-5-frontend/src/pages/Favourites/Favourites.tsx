import { Box, Container, Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getAllFavorites } from '../../API/knowledge-base/index.ts';
import { ArticlesName } from '../../API/knowledge-base/interfaces.ts';
import { BackButton } from '../../components/BackButton/BackButton.tsx';
import { ArticleList } from '../Questions/ArticleList/ArticleList.tsx';

export const Favourites = () => {
  useEffect(() => {
    getAllFavorites().then((values) => setArticles(values));
  }, []);
  const [articles, setArticles] = useState<ArticlesName[]>([]);

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
          {articles.map((item) => (
            <ArticleList article={item} key={item.id} />
          ))}
        </Flex>
      </Box>
    </Container>
  );
};
