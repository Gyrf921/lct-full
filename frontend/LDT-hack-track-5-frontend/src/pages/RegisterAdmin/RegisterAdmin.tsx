import {
  Button,
  Container,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerCompany } from '../../API/auth/index.ts';
import { registerCompanyData } from '../../API/auth/interfaces.ts';
import { setError, setRoles } from '../../store/userSlice.ts';
import { HeadingH3, TextLarge, TextMiddle } from '../../theme/AdaptiveConts.ts';
import classes from '../Register/Register.module.css';
import { Error } from '../../components/Error/Error.tsx';

export const RegisterAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values: registerCompanyData) => {
    try {
      const data = await registerCompany(values);
      localStorage.setItem('token', data.jwt.token);
      dispatch(setRoles(data.jwt.roleName));
      form.reset();
      navigate(0);
    } catch (error) {
      const err = error as AxiosError;
      dispatch(setError(err.response?.data.message));
    }
  };

  const form = useForm<registerCompanyData>({
    initialValues: {
      companyDTO: {
        name: '',
        description: '',
        email: '',
        phone: '',
        website: '',
      },
      registrationAdminDTO: {
        name: '',
        email: '',
        password: '',
      },
    },

    validate: {
      companyDTO: {
        name: (value) =>
          /.+/.test(value) ? null : 'Имя должно состоять хотя бы из 1 символа',
        description: (value) =>
          /.+/.test(value)
            ? null
            : 'Описание должно состоять хотя бы из 1 символа',
        email: (value) =>
          /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(value)
            ? null
            : 'Некорректный адрес электронной почты',
        phone: (value) =>
          /.+/.test(value) ? null : 'Некорректный номер телефона',
        website: (value) =>
          /^(http:\/\/|https:\/\/)/i.test(value)
            ? null
            : 'Некорректный адрес веб сайта',
      },
      registrationAdminDTO: {
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
      },
    },
  });

  return (
    <>
      <Error />
      <Container
        className={classes.register}
        h='100%'
        m={{ base: '30px auto' }}
      >
        <form
          className={classes.register__form}
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Text className={classes.register__title} fz={HeadingH3}>
            Регистрация компании
          </Text>
          <Flex gap='30px' direction={{ xs: 'row', base: 'column' }}>
            <Flex direction='column' gap='30px'>
              <Text className={classes.register__title} fz={TextLarge}>
                Данные компании
              </Text>
              <TextInput
                variant='filled'
                classNames={{
                  root: classes.register__inputRoot,
                  input: classes.register__input,
                }}
                placeholder='Название'
                {...form.getInputProps('companyDTO.name')}
              />
              <TextInput
                variant='filled'
                classNames={{
                  root: classes.register__inputRoot,
                  input: classes.register__input,
                }}
                placeholder='Описание'
                {...form.getInputProps('companyDTO.description')}
              />
              <TextInput
                variant='filled'
                classNames={{
                  root: classes.register__inputRoot,
                  input: classes.register__input,
                }}
                placeholder='Email'
                {...form.getInputProps('companyDTO.email')}
              />
              <TextInput
                variant='filled'
                classNames={{
                  root: classes.register__inputRoot,
                  input: classes.register__input,
                }}
                placeholder='Телефон'
                {...form.getInputProps('companyDTO.phone')}
              />
              <TextInput
                variant='filled'
                classNames={{
                  root: classes.register__inputRoot,
                  input: classes.register__input,
                }}
                placeholder='Сайт'
                {...form.getInputProps('companyDTO.website')}
              />
            </Flex>
            <Flex direction='column' gap='30px'>
              <Text className={classes.register__title} fz={TextLarge}>
                Данные админа
              </Text>
              <TextInput
                variant='filled'
                classNames={{
                  root: classes.register__inputRoot,
                  input: classes.register__input,
                }}
                placeholder='Имя'
                {...form.getInputProps('registrationAdminDTO.name')}
              />
              <TextInput
                variant='filled'
                classNames={{
                  root: classes.register__inputRoot,
                  input: classes.register__input,
                }}
                placeholder='Email'
                {...form.getInputProps('registrationAdminDTO.email')}
              />
              <PasswordInput
                variant='filled'
                classNames={{
                  root: classes.register__inputRoot,
                  input: classes.register__input,
                  innerInput: classes.register__input,
                }}
                placeholder='Пароль'
                {...form.getInputProps('registrationAdminDTO.password')}
              />
            </Flex>
          </Flex>
          <Button
            w='50%'
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
