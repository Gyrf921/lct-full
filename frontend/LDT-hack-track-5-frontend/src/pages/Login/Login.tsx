import {
  Button,
  Container,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../API/auth/index.ts';
import { loginData } from '../../API/auth/interfaces.ts';
import { setError, setRoles } from '../../store/userSlice.ts';
import { HeadingH3, TextMiddle } from '../../theme/AdaptiveConts.ts';
import classes from '../Register/Register.module.css';
import { Error } from '../../components/Error/Error.tsx';

export const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (values: loginData) => {
    try {
      const data = await login(values);
      localStorage.setItem('token', data.token);
      dispatch(setRoles(data.roleName));
      form.reset();
      navigate(0);
    } catch (error) {
      const err = error as AxiosError;
      dispatch(setError(err.response?.data.message));
    }
  };

  const form = useForm<loginData>({
    initialValues: {
      email: '',
      password: '',
    },
  });
  return (
    <>
      <Error />
      <Container
        className={classes.register}
        h='100vh'
        maw={{ lg: '550px', md: '450px', xs: '400px', base: '350px' }}
      >
        <form
          className={classes.register__form}
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Text className={classes.register__title} fz={HeadingH3}>
            Войти
          </Text>
          <TextInput
            variant='filled'
            classNames={{
              root: classes.register__inputRoot,
              input: classes.register__input,
            }}
            placeholder='Email'
            {...form.getInputProps('email')}
          />
          <PasswordInput
            variant='filled'
            classNames={{
              root: classes.register__inputRoot,
              input: classes.register__input,
              innerInput: classes.register__input,
            }}
            placeholder='Пароль'
            {...form.getInputProps('password')}
          />
          <Button type='submit' className={classes.register__button}>
            Войти
          </Button>
          <Button
            fz={TextMiddle}
            variant={'white'}
            component={Link}
            to='/register'
          >
            Зарегистрироваться
          </Button>
        </form>
      </Container>
    </>
  );
};
