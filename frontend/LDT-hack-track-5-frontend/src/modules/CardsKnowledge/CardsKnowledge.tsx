import { Box } from '@mantine/core';
import { useSelector } from 'react-redux';
import { CardLecture } from '../../components/CardLecture/CardLecture';
import { CompanyInfoCard } from '../../components/CompanyInfoCard/CompanyInfoCard';
import { FavoritesCard } from '../../components/FavoritesCard/FavoritesCard';
import { RootState } from '../../store';
import { Articles } from '../Articles/Articles';
import classes from './CardsKnowledge.module.css';

export const CardsKnowledge = () => {
  const roles = useSelector((state: RootState) => state.roles);
  const isAdmin = roles.includes('ROLE_ADMIN');

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.favorite} display={isAdmin ? 'none' : 'block'}>
        <FavoritesCard />
      </Box>
      <Box className={classes.articles}>
        <Articles />
      </Box>
      <Box className={`${classes.info} ${isAdmin ? classes.auth : ''}`}>
        <CompanyInfoCard />
      </Box>
      <Box className={classes.lecture}>
        <CardLecture type='video' />
      </Box>
      <Box className={classes.lecture}>
        <CardLecture type='audio' />
      </Box>
    </Box>
  );
};
