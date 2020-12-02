import React from 'react';
import { View, Text, Platform, Image, FlatList } from 'react-native';
import styled, { css } from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AlmostLazyImage from 'components/Avatar/AlmostLazyAvatar/AlmostLazyAvatar';
import CustomButton from 'components/CustomButton/CustomButton';
import theme from 'globals/styles/defaultTheme';
import * as ImagePicker from 'expo-image-picker';
import { AvatarContainer } from 'components/Avatar/Avatar.sc';
import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from 'react-query';
import { getAllAvatars } from 'api';
import { isCompleteAvatar } from 'helpers/typeGuards';

interface Props {
  onCloseButtonHandler: () => void;
  onAvatarClick: (url: string) => void;
}

const HeroAvatarModal: React.FC<Props> = ({
  onCloseButtonHandler,
  onAvatarClick,
}) => {
  const numberOfColumns = 3;
  const [image, setImage] = React.useState<string | null>(null);

  const { data: avatars } = useQuery('avatars', getAllAvatars);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const renderAvatars = ({ item }: { item: Partial<Avatar> }) => {
    if (item.id === 'placeholder') {
      return (
        <AvatarContainer
          size={100}
          additionalStyles={css`
            opacity: 0;
          `}
        ></AvatarContainer>
      );
    }
    if (item.id === 'camera') {
      return image ? (
        <TouchableOpacity onPress={() => onAvatarClick(image)}>
          <AvatarContainer size={100}>
            <AvatarImage
              source={{
                uri: image,
              }}
            />
          </AvatarContainer>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={pickImage}>
          <AvatarContainer
            size={100}
            additionalStyles={css`
              justify-content: center;
              align-items: center;
              border: 0;
            `}
          >
            <FontAwesome name="film" size={60} color="black" />
          </AvatarContainer>
        </TouchableOpacity>
      );
    }
    if (isCompleteAvatar(item)) {
      return (
        <TouchableOpacity onPress={() => onAvatarClick(item.avatar_url)}>
          <AlmostLazyImage size={100} imageUrl={item.avatar_url} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const formatData = (avatars: Avatar[]): Partial<Avatar>[] => {
    const avatarPlaceholders = avatars.length + 1;
    const numberOfMissingAvatars =
      avatarPlaceholders % numberOfColumns === 0
        ? 0
        : numberOfColumns - (avatarPlaceholders % numberOfColumns);
    const newAvatars = [
      {
        id: 'camera',
      },
      ...avatars,
    ];
    for (let i = 0; i < numberOfMissingAvatars; i++) {
      newAvatars.push({
        id: 'placeholder',
      });
    }

    return newAvatars;
  };

  if (avatars) {
    return (
      <Container>
        <FlatList
          data={formatData(avatars)}
          numColumns={numberOfColumns}
          renderItem={renderAvatars}
          keyExtractor={(item) => item.id as string}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
        />
        <CustomButton
          onPressHandler={onCloseButtonHandler}
          backgroundColor={theme.colors.primary}
        >
          <Text>Cancel</Text>
        </CustomButton>
      </Container>
    );
  } else {
    return null;
  }
};

export default HeroAvatarModal;

export const Container = styled(View)`
  position: absolute;
  align-self: center;
  justify-content: center;
  width: 360px;
  height: 650px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.white};
`;

export const ModalContentContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 25px;
`;

export const AvatarImage = styled(Image)`
  width: 100px;
  height: 100px;
`;
