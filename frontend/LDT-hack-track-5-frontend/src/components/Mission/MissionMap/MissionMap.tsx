import { Box, Image, Flex } from '@mantine/core';
import { useState } from 'react';
import part1 from '../../../assets/icon/1part.svg';
import part2 from '../../../assets/icon/2part.svg';
import part3 from '../../../assets/icon/Part3.svg';
import part4 from '../../../assets/icon/Part4.svg';
import part5 from '../../../assets/icon/Part5.svg';
import part6 from '../../../assets/icon/Part6.svg';
import StartPart from '../../../assets/icon/StarPart.svg';
import { allTaskAndStage } from '../../../API/hr/interfaces.ts';
import classes from './MissionMap.module.css';

interface IMissionMap {
  stage: allTaskAndStage[];
}
export const MissionMap = ({ stage }: IMissionMap) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Flex
      className={classes.missionmap}
      gap='20px'
      justify='center'
      align={{
        lg: 'flex-start',
        md: 'flex-start',
        sm: 'center',
        base: 'center',
      }}
      direction='row'
      wrap='wrap'
      m='30px 20px'
    >
      <Box
        className={`${classes.missionmap__box} ${
          isActive ? classes.missionmap__boxActive : ''
        }`}
      >
        <Image src={StartPart} />
      </Box>
      <Box
        className={`${classes.missionmap__box} ${
          isActive ? classes.missionmap__boxActive : ''
        }`}
      >
        <Image src={part1} />
      </Box>
      <Box
        className={`${classes.missionmap__box} ${
          isActive ? classes.missionmap__boxActive : ''
        }`}
      >
        <Image src={part2} />
      </Box>
      <Box
        className={`${classes.missionmap__box} ${
          isActive ? classes.missionmap__boxActive : ''
        }`}
      >
        <Image src={part3} />
      </Box>
      <Box
        className={`${classes.missionmap__box} ${
          isActive ? classes.missionmap__boxActive : ''
        }`}
      >
        <Image src={part4} />
      </Box>
      <Box
        className={`${classes.missionmap__box} ${
          isActive ? classes.missionmap__boxActive : ''
        }`}
      >
        <Image src={part5} />
      </Box>
      <Box
        className={`${classes.missionmap__box} ${
          isActive ? classes.missionmap__boxActive : ''
        }`}
      >
        <Image src={part6} />
      </Box>
    </Flex>
  );
};
