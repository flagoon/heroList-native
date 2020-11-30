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

  const imageUrl = hero.avatar_url.replace('50x50', '1200x1200');
  console.log({ imageUrl, avatar: hero.avatar_url });

  return (
    <Container>
      <HeroContainer>
        <HeroName>{hero.full_name}</HeroName>
        <SimpleAvatar imageUrl={imageUrl} size={200} />

        <HeroType>{hero.type.name}</HeroType>
        <HeroDescription>{hero.description}</HeroDescription>
      </HeroContainer>
    </Container>
  );
};

export default Hero;
