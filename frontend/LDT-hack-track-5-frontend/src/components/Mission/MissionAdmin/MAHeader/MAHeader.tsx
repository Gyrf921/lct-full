import { Flex, Image, Text } from '@mantine/core';
import classes from '../MissionAdmin.module.css';
import coin from '../../../../assets/icon/coin.svg';

export const MaHeader = () => {
  return (
    <Flex
      justify='space-between'
      align='center'
      className={classes.misionAdmin}
      pb='30px'
    >
      <Flex align='center' gap='xs'>
        <Image
          w='167px'
          h='167px'
          radius='50%'
          src='https://www.tulazoo.ru/media/k2/items/cache/ea82697ed9755e975f3c7d735db2070c_M.jpg'
        />
        <Flex direction='column' gap='xs'>
          <Text className={classes.misionAdmin__name}>Имя человечка</Text>
          <Text className={classes.misionAdmin__status}>Статус человечка</Text>
          <Text className={classes.misionAdmin__department}>
            Отдел человечка
          </Text>
        </Flex>
      </Flex>
      <Flex direction='column' gap='xs' align='flex-end'>
        <Flex align='flex-end' gap='10px'>
          <Text className={classes.misionAdmin__department} fw='700'>
            10 монет
          </Text>
          <Image src={coin} w='40px' h='40px' />
        </Flex>
        <Text size='24px' className={classes.misionAdmin__status}>
          Выполненных миссий: {2}
        </Text>
        <Text size='24px' className={classes.misionAdmin__status}>
          Пройденных квестов: {2}
        </Text>
      </Flex>
    </Flex>
  );
};
