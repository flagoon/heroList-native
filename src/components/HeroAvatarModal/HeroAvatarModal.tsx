import React from 'react';
import { View, Platform, FlatList } from 'react-native';
import styled, { useTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AlmostLazyImage from 'components/Avatar/AlmostLazyAvatar/AlmostLazyAvatar';
import CustomButton from 'components/CustomButton/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import {
  AvatarImage,
  AvatarPlaceholder,
  CustomAvatar,
} from 'components/Avatar/Avatar.sc';
import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from 'react-query';
import { getAllAvatars } from 'api';
import { isCompleteAvatar } from 'helpers/typeGuards';

interface Props {
  onCloseButtonHandler: () => void;
  onAvatarClick: (url: string) => void;
  avatarSize: number;
}

const HeroAvatarModal: React.FC<Props> = ({
  onCloseButtonHandler,
  onAvatarClick,
  avatarSize,
}) => {
  const numberOfColumns = 3;
  const theme = useTheme();

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
      return <AvatarPlaceholder size={avatarSize} />;
    }
    if (item.id === 'camera') {
      return image ? (
        <TouchableOpacity onPress={() => onAvatarClick(image)}>
          <AvatarImage
            size={avatarSize}
            source={{
              uri: image,
            }}
          />
        </TouchableOpacity>
      ) : (
        <CustomAvatar onPress={pickImage} size={avatarSize}>
          <FontAwesome name="film" size={60} color={theme.colors.black} />
        </CustomAvatar>
      );
    }
    if (isCompleteAvatar(item)) {
      return (
        <TouchableOpacity onPress={() => onAvatarClick(item.avatar_url)}>
          <AlmostLazyImage size={avatarSize} imageUrl={item.avatar_url} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const formatData = (avatars: Avatar[]): Partial<Avatar>[] => {
    // number of avatars, plus number of additional avatars, in this case 1 camera avatar
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
          // eslint-disable-next-line react-native/no-inline-styles
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
        />
        <CustomButton
          onPressHandler={onCloseButtonHandler}
          backgroundColor={theme.colors.primary}
        >
          Cancel
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
