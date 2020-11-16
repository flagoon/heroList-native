import React from 'react';
import Avatar from '../Avatar/Avatar';
import { Text } from 'react-native';
import {
  HeroContainer,
  HeroDetails,
  HeroMain,
  HeroName,
  HeroType,
} from './Hero.sc';

const Hero: React.FC<Hero> = ({ full_name, description, avatar_url, type }) => {
  return (
    <HeroContainer>
      <HeroMain>
        <Avatar url={avatar_url} />
        <HeroDetails>
          <HeroName>{full_name}</HeroName>
          <HeroType>{type}</HeroType>
        </HeroDetails>
      </HeroMain>

      <Text ellipsizeMode="tail" numberOfLines={1}>
        {description}
      </Text>
    </HeroContainer>
  );
};

export default Hero;
