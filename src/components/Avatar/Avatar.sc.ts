import styled from 'styled-components';
import { View, Image } from 'react-native';

export const HeroListAvatar = styled(View)`
  border-radius: 25px;
  overflow: hidden;
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const AvatarImage = styled(Image)`
  height: 50px;
  width: 50px;
`;

export const AvatarContainer = styled(View)<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  border: 2px solid black;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.white};
  margin: 4px;
`;
