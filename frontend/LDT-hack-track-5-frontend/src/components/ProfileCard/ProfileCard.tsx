import { Anchor, Avatar, Box, Card, Group, Image, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useLocation } from 'react-router-dom';
import { EmployeeData } from '../../API/personal-account/interfaces';
import classes from './ProfileCard.module.css';
import { EditProfileModal } from '../EditProfileModal/EditProfileModal';
import Coin from '../../assets/icon/coin.svg';

interface ProfileCardProps {
  intern: EmployeeData;
}

export const ProfileCard = ({ intern }: ProfileCardProps) => {
  const location = useLocation();
  const [opened, { open, close }] = useDisclosure();
  const rolesNames = intern.roles.map((item) => {
    switch (item.name) {
      case 'ROLE_ADMIN':
        return 'Администратор';
      case 'ROLE_HR':
        return 'HR';
      case 'ROLE_CURATOR':
        return 'Куратор';
      case 'ROLE_EMPLOYEE':
        return 'Сотрудник';
      case 'ROLE_INTERN':
        return 'Стажер';
      default:
        break;
    }
  });

  return (
    <>
      <Card className={classes.card}>
        <Group className={classes.group}>
          <Group align='center' gap={15}>
            <Avatar
              src={intern.imagePath}
              classNames={{
                placeholder: classes.avatar,
                root: classes.rootAvatar,
              }}
            />
            <Box>
              {location.pathname === '/account' ? (
                <Anchor
                  component='button'
                  onClick={() => open()}
                  className={classes.link}
                >
                  Редактировать
                </Anchor>
              ) : (
                ''
              )}
              <EditProfileModal intern={intern} opened={opened} close={close} />
              <Text className={classes.name}>{intern.name}</Text>
              <Group gap={5}>
                <Text className={classes.grade}>{rolesNames}</Text>
                <Anchor className={classes.link}>
                  {intern.post.department.name
                    ? ''
                    : intern.post.department.name}
                </Anchor>
              </Group>
            </Box>
          </Group>
          <Box>
            <Group gap={5}>
              <Text>{intern.account} монет</Text>{' '}
              <Image src={Coin} style={{ width: 24, height: 24 }} />
            </Group>
            <Text>{intern.countCompletedTask} пройденных вызовов</Text>
          </Box>
        </Group>
      </Card>
    </>
  );
};
