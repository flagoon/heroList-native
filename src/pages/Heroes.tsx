import React from 'react';
import { View, Text, FlatList } from 'react-native';
import CustomButton from 'components/CustomButton/CustomButton';
import styled from 'styled-components';
import Hero from 'components/Hero/Hero';
import { getHeroes } from 'api';
import Container from 'components/AppContainer/AppContainer';

const Heroes: React.FC = () => {
  const heroes = getHeroes();
  const renderItem = ({ item }: { item: Hero }) => (
    <Hero
      id={item.id}
      full_name={item.full_name}
      type={item.type}
      avatar_url={item.avatar_url}
      description={item.description}
    />
  );
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
