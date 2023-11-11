import { Box, Container } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeam } from '../../API/team';
import { employeeTeam } from '../../API/team/interfaces';
import { AddEmployee } from '../../modules/AddEmployee/AddEmployee';
import { CardsTeam } from '../../modules/CardsTeam/CardsTeam';
import { InputTeam } from '../../modules/InputTeam/InputTeam';
import { RootState } from '../../store';
import { setError } from '../../store/userSlice';

export const Team = () => {
  const role = useSelector((state: RootState) => state.roles);
  const [team, setTeam] = useState<employeeTeam[]>([]);

  const [name, setName] = useState<string>();
  const [city, setCity] = useState<string>();
  const [post, setPost] = useState<string>();
  const [department, setDepartment] = useState<string>();

  const [debouncedName] = useDebouncedValue(name, 1000);
  const [debouncedCity] = useDebouncedValue(city, 1000);
  const [debouncedPost] = useDebouncedValue(post, 1000);
  const [debouncedDepartment] = useDebouncedValue(department, 1000);
  const dispatch = useDispatch();

  const handleNameChange = (value: string) => {
    setName(value);
  };
  const handleCityChange = (value: string) => {
    setCity(value);
  };
  const handlePostChange = (value: string) => {
    setPost(value);
  };
  const handleDepartmentChange = (value: string) => {
    setDepartment(value);
  };

  useEffect(() => {
    Promise.all([
      getTeam({
        postName: debouncedPost,
        cityName: debouncedCity,
        departmentName: debouncedDepartment,
        employeeName: debouncedName,
      }),
    ])
      .then(([res]) => {
        setTeam(res);
      })
      .catch((err) => dispatch(setError(err.response.data.message)));
  }, [debouncedName, debouncedCity, debouncedPost, debouncedDepartment]);
  return (
    <>
      <Container size='xl'>
        <Box mb={25}>
          <InputTeam
            handleCityChange={handleCityChange}
            handleDepartmentChange={handleDepartmentChange}
            handleNameChange={handleNameChange}
            handlePostChange={handlePostChange}
          />
        </Box>
        <Box
          display={
            role.includes('ROLE_ADMIN') || role.includes('ROLE_ROLE_HR')
              ? 'block'
              : 'none'
          }
        >
          <AddEmployee />
        </Box>
        <Box mt={25}>
          <CardsTeam team={team} />
        </Box>
      </Container>
    </>
  );
};
