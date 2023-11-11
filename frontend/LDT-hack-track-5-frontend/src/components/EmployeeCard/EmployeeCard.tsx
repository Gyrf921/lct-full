import {
  ActionIcon,
  Anchor,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Text,
} from '@mantine/core';
import { IconContext } from 'react-icons';
import { useSelector } from 'react-redux';
import { PiNotePencil } from 'react-icons/pi';
import { BsTrash3 } from 'react-icons/bs';
import { AiOutlinePhone } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { employeeTeam } from '../../API/team/interfaces.ts';
import { RootState } from '../../store';
import PlaceHolder from '../../assets/images/placeholder.jpg';
import classes from './EmployeeCard.module.css';

interface EmployeeCardProps {
  team: employeeTeam;
}

export const EmployeeCard = ({ team }: EmployeeCardProps) => {
  // const role = useSelector((state: RootState) => state.roles);
  const role = useSelector((state: RootState) => state.roles);
  return (
    <Card className={classes.card}>
      <Card.Section>
        <Image src={team.imagePath} fallbackSrc={PlaceHolder} />
      </Card.Section>
      <Text className={classes.name}>{team.name}</Text>
      <Text>{team.city}</Text>
      <Anchor>{team.postName}</Anchor>
      <Flex justify='space-between'>
        <IconContext.Provider value={{ className: classes.icon }}>
          <Group className={classes.contacts}>
            <Group gap={10}>
              <Flex align='center'>
                <HiOutlineMail
                  className={classes.iconButton}
                  variant='light'
                  component='a'
                />
                <Anchor className={classes.contact} href={team.email}>
                  {team.email}
                </Anchor>
              </Flex>
              <Flex align='center'>
                {team.phone !== null ? (
                  <>
                    <AiOutlinePhone
                      className={classes.iconButton}
                      variant='light'
                      component='a'
                    />
                    <Anchor className={classes.contact} href={team?.phone}>
                      {team.phone}
                    </Anchor>
                  </>
                ) : (
                  ''
                )}
              </Flex>
            </Group>
          </Group>
        </IconContext.Provider>
        <Group
          display={role === 'ROLE_ADMIN' ? 'flex' : 'none'}
          direction='row'
          wrap='nowrap'
          my={15}
        >
          <ActionIcon variant='unstyled' c='black'>
            <PiNotePencil />
          </ActionIcon>
          <ActionIcon variant='unstyled' c='red'>
            <BsTrash3 />
          </ActionIcon>
        </Group>
      </Flex>
      {team.roles[0].name === 'ROLE_INTERN' ? (
        <Button
          variant='white'
          component={Link}
          to={`/mission/${team.employeeId}`}
        >
          Перейти к заданиям
        </Button>
      ) : (
        ''
      )}
    </Card>
  );
};
