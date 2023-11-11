import { Box, Image, Title } from '@mantine/core';
import cup from '../../assets/images/cupTitle.png';
import hoodie1 from '../../assets/images/hoodieTitle.png';
import hoodie2 from '../../assets/images/hoodieTitle2.png';
import classes from './ShopTitle.module.css';

export const ShopTitle = () => {
  return (
    <Box className={classes.titleBox}>
      <Box>
        <Image src={hoodie1} className={classes.image1} />
      </Box>
      <Title className={classes.title}>
        Получай призы за выполнение квестов и вызовов
      </Title>
      <Box className={classes.rightImageWrapper}>
        <Image src={hoodie2} className={classes.image3} />
        <Image src={cup} className={classes.image2} />
      </Box>
    </Box>
  );
};
