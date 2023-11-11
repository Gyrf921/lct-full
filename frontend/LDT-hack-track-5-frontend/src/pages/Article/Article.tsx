import { ActionIcon, Box, Container, Image, Text, Title } from '@mantine/core';
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { BiSolidBookmark } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import {
  addToFavorites,
  deleteFromFavorites,
  getAllFavorites,
} from '../../API/knowledge-base';
import {
  ArticlesName,
  Article as IArticle,
} from '../../API/knowledge-base/interfaces';
import { BackButton } from '../../components/BackButton/BackButton';
import { ArticleModal } from '../../modules/ArticleModal/ArticleModal';
import { RootState } from '../../store';
import classes from './Article.module.css';

export const Article = () => {
  useEffect(() => {
    getAllFavorites()
      .then((values) => {
        favoritesRef.current = values;
      })
      .then(() => {
        if (favoritesRef.current.map((item) => item.id).includes(articleId)) {
          setIsFav(true);
        }
      });
  }, []);

  const handleClick = async (articleId: number) => {
    try {
      if (isFav) {
        await deleteFromFavorites(articleId);
        setIsFav(false);
      } else {
        await addToFavorites(articleId);
        setIsFav(true);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  const favoritesRef = useRef<ArticlesName[]>([]);
  const [isFav, setIsFav] = useState(false);
  const { theme, information, imagePath, articleId } =
    useLoaderData() as IArticle;
  const roles = useSelector((state: RootState) => state.roles);
  const isAdmin = roles.includes('ROLE_ADMIN');
  return (
    <>
      <Container size='xl'>
        <Box pos='relative'>
          <BackButton variant='transparent'>Назад</BackButton>
          <Box className={classes.box}>
            <ArticleModal id={articleId} />
            <ActionIcon
              onClick={() => handleClick(articleId)}
              display={isAdmin ? 'none' : 'block'}
              variant='transparent'
              c={isFav ? 'indigo' : 'gray'}
            >
              <BiSolidBookmark style={{ width: 40, height: 40 }} />
            </ActionIcon>
          </Box>
          <Title>{theme}</Title>
          <Text>{information}</Text>
          {imagePath && <Image src={imagePath} w='50%' h='auto' />}
        </Box>
      </Container>
    </>
  );
};
