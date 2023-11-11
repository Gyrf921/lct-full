import { Box } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getPosts } from '../../API/company';
import { getPersonalData } from '../../API/personal-account';
import { Error } from '../../components/Error/Error';
import { Footer } from '../../modules/Footer/Footer';
import { Header } from '../../modules/Header/Header';
import {
  setEmployeeId,
  setError,
  setPostName,
  setRoles,
} from '../../store/userSlice';
import { RootState } from '../../store';
import classes from './Root.module.css';

export const Root = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getPersonalData()
      .then((value) => dispatch(setRoles(value.roles)))
      .catch((err) => {
        dispatch(setError(err));
        navigate(0);
      });
  });
  useEffect(() => {
    getPersonalData()
      .then((value) => dispatch(setEmployeeId(value.employeeId)))
      .catch((err) => {
        dispatch(setError(err));
        navigate(0);
      });
  });
  useEffect(() => {
    getPosts().then((value) => dispatch(setPostName(value)));
  });
  return (
    <>
      <Box className={classes.wrapper}>
        <Box className={classes.headerWrapper}>
          <Header />
        </Box>
        <Box component='main' className={classes.outlet}>
          <Outlet />
        </Box>
        <Footer />
        <Error />
      </Box>
    </>
  );
};
