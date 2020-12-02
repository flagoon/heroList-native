import React from 'react';
import Avatar from '../Avatar/Avatar';
import { Text, Alert } from 'react-native';
import {
  HeroContainer,
  HeroDetails,
  HeroMain,
  HeroName,
  HeroType,
  DeleteButton,
  DeleteIcon,
} from './Hero.sc';
import usePageNavigation from 'helpers/useNavigationHook';

const Hero: React.FC<
  Hero & {
    toDelete: boolean;
    setToDelete: (id: string) => void;
    deleteHero: (id: string) => void;
  }
> = ({
  id,
  full_name,
  description,
  avatar_url,
  type,
  setToDelete,
  toDelete,
  deleteHero,
}) => {
  const createAlert = () => {
    Alert.alert(
      'Delete hero?',
      `Do you want to delete the hero: ${full_name}`,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setToDelete('');
            deleteHero(id);
          },
        },
      ],
      { cancelable: true },
    );
  };

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
      onPress={() => {
        setToDelete('');
        navigateToHeroPage();
      }}
      onLongPress={() => {
        const setId = toDelete ? '' : id;
        setToDelete(setId);
      }}
    >
      <HeroMain>
        {/* TODO: keep in mind to refactor this */}
        <Avatar url={avatar_url} />
        <HeroDetails>
          <HeroName>{full_name}</HeroName>
          {typeof type !== 'string' ? <HeroType>{type.name}</HeroType> : null}
        </HeroDetails>
        {toDelete && (
          <DeleteButton onPress={createAlert}>
            <DeleteIcon name="cross" size={24} color="white" />
          </DeleteButton>
        )}
      </HeroMain>

      <Text ellipsizeMode="tail" numberOfLines={1}>
        {description}
      </Text>
    </HeroContainer>
  );
};

export default Hero;
