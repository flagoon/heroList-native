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
import usePageNavigation from 'helpers/useNavigationHook';
import { HOST_IP } from 'api/CONSTS';

const Hero: React.FC<Hero> = ({
  id,
  full_name,
  description,
  avatar_url,
  type,
}) => {
  const { toHeroPage } = usePageNavigation();
  const navigateToHeroPage = () =>
    toHeroPage({
      id,
      full_name,
      description,
      avatar_url,
      type,
    });
  return (
    <HeroContainer
      onPress={navigateToHeroPage}
      onLongPress={() => console.log('long ' + id)}
    >
      <HeroMain>
        <Avatar url={avatar_url} />
        <HeroDetails>
          <HeroName>{full_name}</HeroName>
          <HeroType>{type.name}</HeroType>
        </HeroDetails>
      </HeroMain>

      <Text ellipsizeMode="tail" numberOfLines={1}>
        {description}
      </Text>
    </HeroContainer>
  );
};

export default Hero;
