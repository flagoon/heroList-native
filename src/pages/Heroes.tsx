import React from 'react';
import { View, Text, FlatList } from 'react-native';
import CustomButton from 'components/CustomButton/CustomButton';
import styled from 'styled-components';
import Hero from 'components/Hero/Hero';
import { useQuery } from 'react-query';
import { getAllHeros } from 'api';
import Container from 'components/AppContainer/AppContainer';
import { HOST_IP } from 'api/CONSTS';
import useNavigation from 'helpers/useNavigationHook';
import { HEROES } from 'globals/constants';
import Spinner from 'react-native-loading-spinner-overlay';

const Heroes: React.FC = () => {
  const { toAddHeroPage } = useNavigation();

  const [profileIdToDelete, setProfileIdToDelete] = React.useState('');

  const {
    isLoading: loadingHeroes,
    data: heroes,
    error: heroesError,
  } = useQuery(HEROES, getAllHeros);

  const renderItem = ({ item }: { item: Hero }) => {
    const changeAvatar = item.avatar_url.includes('localhost')
      ? item.avatar_url.replace('localhost', HOST_IP)
      : item.avatar_url;
    return (
      <Hero
        id={item.id}
        full_name={item.full_name}
        type={item.type}
        avatar_url={changeAvatar}
        description={item.description}
        toDelete={item.id === profileIdToDelete}
        setToDelete={(id) => setProfileIdToDelete(id)}
      />
    );
  };

  if (heroesError) {
    return <Text>Error</Text>;
  }

  return (
    <Container>
      <Spinner visible={loadingHeroes} textContent="Loading heroes" />
      <CustomButton
        onPressHandler={() => toAddHeroPage()}
        textSize="medium"
        textWeight="bold"
      >
        <Text>+ Add hero</Text>
      </CustomButton>
      {heroes !== undefined && (
        <FlatList
          data={heroes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id as string}
        />
      )}
    </Container>
  );
};

export default Heroes;

export const HeroesBreak = styled(View)`
  height: 10px;
`;
