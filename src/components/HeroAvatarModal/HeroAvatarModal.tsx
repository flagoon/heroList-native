import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { ROBOHASH_URL } from 'globals/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AlmostLazyImage from 'components/Avatar/AlmostLazyAvatar/AlmostLazyAvatar';
import CustomButton from 'components/CustomButton/CustomButton';
import theme from 'globals/styles/defaultTheme';

interface Props {
  onCloseButtonHandler: () => void;
  onAvatarClick: (url: string) => void;
}

const HeroAvatarModal: React.FC<Props> = ({
  onCloseButtonHandler,
  onAvatarClick,
}) => {
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
      <ModalContentContainer>{generateRandomAvatars()}</ModalContentContainer>
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
