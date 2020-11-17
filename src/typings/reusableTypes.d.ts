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
  type: string;
  navigation?: RootStackParamList;
};
