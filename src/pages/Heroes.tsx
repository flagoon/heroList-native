import React from 'react';
import { View, Text, FlatList } from 'react-native';
import CustomButton from 'components/CustomButton/CustomButton';
import styled from 'styled-components';
import Hero from 'components/Hero/Hero';
import { getAllHeros } from 'api';
import Container from 'components/AppContainer/AppContainer';
import { HOST_IP } from 'api/CONSTS';

const Heroes: React.FC = () => {
  const [heroes, setHeroes] = React.useState<Hero[]>([]);

  React.useEffect(() => {
    (async function () {
      const heroes = await getAllHeros();
      setHeroes(heroes.data.data);
    })();
  }, []);

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
      />
    );
  };
  return (
    <Container>
      <CustomButton
        onPressHandler={() => console.log('pressed')}
        textSize="medium"
        textWeight="bold"
      >
        <Text>+ Add hero</Text>
      </CustomButton>
      <FlatList
        data={heroes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id as string}
      />
    </Container>
  );
};

export default Heroes;

export const HeroesBreak = styled(View)`
  height: 10px;
`;
