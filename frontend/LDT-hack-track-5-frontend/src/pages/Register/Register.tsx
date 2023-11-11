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
import { register } from '../../API/auth/index.ts';
import { registerData } from '../../API/auth/interfaces.ts';
import { Error } from '../../components/Error/Error.tsx';
import { setError, setRoles } from '../../store/userSlice.ts';
import { HeadingH3, TextMiddle } from '../../theme/AdaptiveConts.ts';
import classes from './Register.module.css';

interface registerForm {
  name: string;
  email: string;
  password: string;
  againPassword: string;
}

export const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (values: registerForm) => {
    try {
      const registerData: registerData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      const data = await register(registerData);
      localStorage.setItem('token', data.token);
      dispatch(setRoles(data.roleName));
      form.reset();
      navigate(0);
    } catch (error) {
      const err = error as AxiosError;
      dispatch(setError(err.response?.data.message));
    }
  };

  const form = useForm<registerForm>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      againPassword: '',
    },

    validate: {
      name: (value) =>
        /.+/.test(value) ? null : 'Имя должно состоять хотя бы из 1 символа',
      email: (value) =>
        /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(value)
          ? null
          : 'Некорректный адрес электронной почты',
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
          ? null
          : 'Пароль должен содержать не менее 8 символов и хотя бы одну строчную и одну заглавную букву, одну цифру, один из спец. символов: @, $, !, %, *, ?, &',
      againPassword: (value) =>
        value === form.values.password ? null : 'Пароли не совпадают',
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
            Регистрация
          </Text>
          <TextInput
            variant='filled'
            classNames={{
              root: classes.register__inputRoot,
              input: classes.register__input,
            }}
            placeholder='Ваше имя'
            {...form.getInputProps('name')}
          />
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
          <PasswordInput
            variant='filled'
            w='100%'
            classNames={{
              root: classes.register__inputRoot,
              input: classes.register__input,
              innerInput: classes.register__input,
            }}
            placeholder='Повторите пароль'
            {...form.getInputProps('againPassword')}
          />
          <Button
            type='submit'
            className={classes.register__button}
            fz={TextMiddle}
          >
            Далее
          </Button>
          <Button
            fz={TextMiddle}
            variant={'white'}
            component={Link}
            to='/login'
          >
            Есть аккаунт? Войти
          </Button>
        </form>
      </Container>
    </>
  );
};
