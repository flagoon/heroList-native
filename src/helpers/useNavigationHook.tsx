import { useNavigation } from '@react-navigation/native';

const usePageNavigation = (): {
  toHeroPage: (pet: Hero) => void;
  toAddHeroPage: () => void;
  toHeroesPage: () => void;
} => {
  const navigation = useNavigation();

  return {
    toHeroPage: (hero: Hero) =>
      navigation.navigate('Hero', {
        hero,
      }),
    toHeroesPage: () => navigation.navigate('Heroes'),
    toAddHeroPage: () => navigation.navigate('AddHero'),
  };
};

export default usePageNavigation;
