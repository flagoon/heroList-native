declare type RootStackParamList = {
  Heroes: undefined;
  Hero: {
    hero: Hero;
  };
  AddHero: undefined;
};

declare type Hero = {
  id: string;
  full_name: string;
  description: string;
  avatar_url: string;
  type: { id: string; name: string } | string;
  navigation?: RootStackParamList;
};

declare type HeroType = {
  id: string;
  name: string;
};
