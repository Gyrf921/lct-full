import { Flex, AspectRatio, Text, Image, Button } from '@mantine/core';
import { useSelector } from 'react-redux';
import { Image40, TextForInput, TextSmall } from '../../theme/AdaptiveConts.ts';
import Trash from '../../assets/images/TrashBin.png';
import { RootState } from '../../store';
import { media } from '../../API/knowledge-base/interfaces.ts';
import classes from './LectureVideo.module.css';

interface LectureVideo {
  video: media;
}

export const LectureVideo = ({ video }: LectureVideo) => {
  const role = useSelector((state: RootState) => state.roles);
  return (
    <Flex className={classes.lecturevideo}>
      <AspectRatio ratio={16 / 9}>
        <iframe
          className={classes.lecturevideo__video}
          src={video.url}
          title={video.name}
          style={{ border: 0 }}
          allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </AspectRatio>
      <Flex
        direction='row'
        m='30px auto 40px 22px'
        justify={'space-between'}
        w='90%'
      >
        <Flex direction='column'>
          <Flex align='center' gap='13px' mb='8px'>
            <Text
              truncate='end'
              className={classes.lecturevideo__title}
              fz={TextForInput}
            >
              {video.name}
            </Text>
            <Text
              truncate='end'
              className={classes.lecturevideo__description}
              fz={TextSmall}
            >
              {video.description}
            </Text>
          </Flex>
          <Text className={classes.lecturevideo__department} fz={TextForInput}>
            {video.postName}
          </Text>
        </Flex>
        {role[0] === 'ROLE_HR' || role[0] === 'ROLE_ADMIN' ? (
          <Button
            variant='white'
            rightSection={<Image src={Trash} w={Image40} h={Image40} />}
            classNames={{
              root: classes.lecturevideo__button,
            }}
          ></Button>
        ) : (
          ''
        )}
      </Flex>
    </Flex>
  );
};
