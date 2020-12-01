import React from 'react';
import { View, Text, Platform, Image } from 'react-native';
import styled, { css } from 'styled-components';
import { ROBOHASH_URL } from 'globals/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AlmostLazyImage from 'components/Avatar/AlmostLazyAvatar/AlmostLazyAvatar';
import CustomButton from 'components/CustomButton/CustomButton';
import theme from 'globals/styles/defaultTheme';
import * as ImagePicker from 'expo-image-picker';
import { AvatarContainer } from 'components/Avatar/Avatar.sc';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  onCloseButtonHandler: () => void;
  onAvatarClick: (url: string) => void;
}

const HeroAvatarModal: React.FC<Props> = ({
  onCloseButtonHandler,
  onAvatarClick,
}) => {
  const [image, setImage] = React.useState<string | null>(null);

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

  const generateRandomAvatars = () => {
    const array = [];
    for (let i = 0; i < 17; i++) {
      const url =
        ROBOHASH_URL + Math.random().toString().substr(2, 7) + '.png?set=any';

      const Element = (
        <TouchableOpacity onPress={() => onAvatarClick(url)} key={i}>
          <AlmostLazyImage size={100} imageUrl={url} />
        </TouchableOpacity>
      );

      array.push(Element);
    }
    return array;
  };
  return (
    <Container>
      <ModalContentContainer>
        {image ? (
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
        )}
        {generateRandomAvatars()}
      </ModalContentContainer>
      <CustomButton
        onPressHandler={onCloseButtonHandler}
        backgroundColor={theme.colors.primary}
      >
        <Text>Cancel</Text>
      </CustomButton>
    </Container>
  );
};

export default HeroAvatarModal;

export const Container = styled(View)`
  position: absolute;
  align-self: center;
  justify-content: center;
  width: 360px;
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
