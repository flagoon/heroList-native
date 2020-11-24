import { View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styled from 'styled-components';

export const HeroContainer = styled(TouchableOpacity)`
  margin: 4px 0;
  border-radius: 4px;
  padding: 8px;
  height: 90px;
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const HeroDetails = styled(View)`
  height: 50px;
  justify-content: space-between;
`;

export const HeroMain = styled(View)`
  flex-direction: row;
`;

export const HeroName = styled(Text)`
  font-size: ${(props) => props.theme.textSize.medium};
`;

export const HeroType = styled(Text)`
  font-size: ${(props) => props.theme.textSize.normal};
`;

export const DeleteButton = styled(TouchableOpacity)`
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${(props) => props.theme.colors.background};
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
`;

export const DeleteIcon = styled(Entypo)`
  text-align: center;
`;
