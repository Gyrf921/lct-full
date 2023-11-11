import { Box, Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getPersonalData } from '../../API/personal-account';
import { EmployeeData } from '../../API/personal-account/interfaces';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { Products } from '../../modules/Products/Products';
import { ShopTitle } from '../../modules/ShopTitle/ShopTitle';
export const Shop = () => {
  useEffect(() => {
    setLoading(true);
    getPersonalData().then((value) => {
      setPerson(value);
      setLoading(false);
    });
  }, []);
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState<EmployeeData>();
  if (loading) {
    return loading;
  }
  return (
    <>
      <Container size='xl'>
        <ShopTitle />
        <Box mt={25}>
          <ProfileCard intern={person} />
        </Box>
        <Products />
      </Container>
    </>
  );
};
