import { Autocomplete, Button, Modal, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { RootState } from '../../store';
import { getCompanyDep, getCompanyRoles } from '../../API/company';
import { getTeam } from '../../API/team';
import { addEmployee } from '../../API/hr';
import { employeeData } from '../../API/admin/interfaces.ts';

export const AddEmployee = () => {
  const [roles, setRoles] = useState([]);
  const [team, setTeam] = useState([]);
  const roleArr = roles.map((item) => item.name);
  const emailCurator = team
    .filter(
      (obj) =>
        obj.roles && obj.roles.some((role) => role.name === 'ROLE_CURATOR')
    )
    .map((obj) => obj.email);

  const postNames = useSelector((state: RootState) => state.postName);
  useEffect(() => {
    getCompanyRoles().then((roles) => setRoles(roles));
    getTeam().then((team) => setTeam(team));
  }, []);

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      roleName: '',
      postName: '',
      curatorEmail: '',
    },
  });

  const closePopup = () => {
    close();
    form.reset();
  };

  const handleSumbit = async (data: employeeData) => {
    try {
      addEmployee(data);
      closePopup();
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  return (
    <>
      <Button onClick={open}>Добавить сотрудника</Button>
      <Modal opened={opened} onClose={closePopup} title='Добавить сотрудника'>
        <form
          onSubmit={form.onSubmit((values) => {
            handleSumbit(values);
          })}
        >
          <Stack>
            <TextInput
              variant='primary'
              placeholder='Имя'
              {...form.getInputProps('name')}
            />
            <TextInput
              variant='primary'
              placeholder='Почта'
              {...form.getInputProps('email')}
            />
            <Autocomplete
              variant='primary'
              placeholder='Выбрать роль'
              {...form.getInputProps('roleName')}
              data={roleArr}
            />
            <Autocomplete
              variant='primary'
              placeholder='Должность'
              {...form.getInputProps('postName')}
              data={postNames}
            />
            <Autocomplete
              variant='primary'
              placeholder='Куратор'
              {...form.getInputProps('curatorEmail')}
              data={emailCurator}
            />
            <Button type='submit'>Сохранить</Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};
