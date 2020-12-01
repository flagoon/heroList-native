import React from 'react';
import Container from 'components/AppContainer/AppContainer';
import SimpleAvatar from 'components/Avatar/SimpleAvatar/SimpleAvatar';
import { HeroContainer, HeroName, HeroType, HeroDescription } from './Hero.sc';

interface Props {
  route: {
    params: {
      hero: Hero;
    };
  };
}

const Hero: React.FC<Props> = ({ route }) => {
  const {
    params: { hero },
  } = route;

  return (
    <Container>
      <HeroContainer>
        <HeroName>{hero.full_name}</HeroName>
        <SimpleAvatar imageUrl={hero.avatar_url} size={200} />

        <HeroType>{hero.type.name}</HeroType>
        <HeroDescription>{hero.description}</HeroDescription>
      </HeroContainer>
    </Container>
  );
};

export default Hero;
