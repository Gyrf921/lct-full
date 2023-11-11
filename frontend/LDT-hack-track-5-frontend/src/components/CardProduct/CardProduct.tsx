import { Box, Button, Flex, Image, Stack, Text } from '@mantine/core';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buyProduct } from '../../API/market';
import { setError } from '../../store/userSlice';
import Coin from '../../assets/icon/coin.svg';
import classes from './CardProduct.module.css';

interface CardProduct {
  price: number;
  image: string;
  id: number;
}

export const CardProduct = ({ price, image, id }: CardProduct) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = async (productId: number) => {
    try {
      await buyProduct(productId);
      navigate(0);
    } catch (error) {
      const err = error as AxiosError;
      dispatch(setError(err.response?.data.message));
    }
  };
  return (
    <>
      <Stack gap={'lg'}>
        <Box className={classes.wrapper}>
          <Flex gap={5} justify={'flex-end'}>
            <Text className={classes.text}>{price}</Text>
            <Image src={Coin} style={{ width: 24, height: 24 }} />
          </Flex>
          <Box className={classes.imageWrapper}>
            <Box className={classes.image}>
              <Image src={image} />
            </Box>
          </Box>
        </Box>
        <Button onClick={() => handleClick(id)} className={classes.button}>
          Купить
        </Button>
      </Stack>
    </>
  );
};
