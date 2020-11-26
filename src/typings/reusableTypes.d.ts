declare type RootStackParamList = {
  Heroes: undefined;
  Hero: {
    hero: Hero;
  };
  AddHero: undefined;
};

declare type Hero<T = { id: string; name: string }> = {
  id: string;
  full_name: string;
  description: string;
  avatar_url: string;
  type: T;
  navigation?: RootStackParamList;
};

declare type HeroType = {
  id: string;
  name: string;
};
