import { Box, Group, TextInput } from '@mantine/core';
import classes from './InputTeam.module.css';

interface InputTeamProps {
  handleNameChange: (value: string) => void;
  handleCityChange: (value: string) => void;
  handlePostChange: (value: string) => void;
  handleDepartmentChange: (value: string) => void;
}

export const InputTeam = ({
  handleCityChange,
  handleDepartmentChange,
  handleNameChange,
  handlePostChange,
}: InputTeamProps) => {
  return (
    <>
      <Group className={classes.wrapperInputs}>
        <Box className={classes.wrapperInput}>
          <TextInput
            onChange={(event) => handleNameChange(event.target.value)}
            placeholder='Имя'
            variant='primary'
          />
        </Box>
        <Box className={classes.wrapperInput}>
          <TextInput
            onChange={(event) => handleCityChange(event.target.value)}
            placeholder='Город'
            variant='primary'
          />
        </Box>
        <Box className={classes.wrapperInput}>
          <TextInput
            onChange={(event) => handlePostChange(event.target.value)}
            placeholder='Должность'
            variant='primary'
          />
        </Box>
        <Box className={classes.wrapperInput}>
          <TextInput
            onChange={(event) => handleDepartmentChange(event.target.value)}
            placeholder='Отдел'
            variant='primary'
          />
        </Box>
      </Group>
    </>
  );
};
