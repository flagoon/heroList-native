import React from 'react';
import { FlatList } from 'react-native';
import CustomButton from 'components/CustomButton/CustomButton';
import Hero from 'components/Hero/Hero';
import { useQuery, useMutation, queryCache } from 'react-query';
import { getAllHeros, deleteHero } from 'api';
import Container from 'components/AppContainer/AppContainer';
import { HOST_IP } from 'api/CONSTS';
import useNavigation from 'helpers/useNavigationHook';
import Spinner from 'react-native-loading-spinner-overlay';
import { useTheme } from 'styled-components';
import ErrorComponent from 'components/ErrorComponent/ErrorComponent';

const Heroes: React.FC = () => {
  const theme = useTheme();
  const spinnerTextColor = {
    color: theme.colors.white,
  };

  const { toAddHeroPage } = useNavigation();
  const [profileIdToDelete, setProfileIdToDelete] = React.useState('');

  const [deleteMutation] = useMutation(deleteHero, {
    onMutate: (value) => {
      queryCache.cancelQueries('heroes');
      const prev = queryCache.getQueryData('heroes');
      queryCache.setQueryData('heroes', (data: Hero[] | undefined): Hero[] => {
        if (data) {
          return data.filter((hero: Hero) => hero.id !== value);
        }
        return [];
      });
      return () => queryCache.setQueryData('heroes', prev);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (_, __, rollback) => (rollback as any)(),
    onSettled: () => {
      queryCache.invalidateQueries('heroes');
    },
  });

  const {
    isLoading: loadingHeroes,
    data: heroes,
    error: heroesError,
  } = useQuery<Hero[], Error>('heroes', getAllHeros);

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
        deleteHero={(id) => deleteMutation(id)}
      />
    );
  };

  // TODO: better handling errors
  if (heroesError) {
    return <ErrorComponent errorMessage={heroesError.message} />;
  }

  return (
    <Container>
      <Spinner
        visible={loadingHeroes}
        textStyle={spinnerTextColor}
        textContent="Loading heroes"
        color={theme.colors.white}
      />
      <CustomButton
        onPressHandler={toAddHeroPage}
        textSize="medium"
        textWeight="bold"
      >
        + Add hero
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
