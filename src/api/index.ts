import data from './data';

export const getHeroes = (): Hero[] => {
  return data;
};

export const getHero = (heroId: string): Hero => {
  const hero = data.find((hero) => heroId === hero.id);
  if (hero) {
    return hero;
  }
  throw new Error('No hero with given Id');
};
