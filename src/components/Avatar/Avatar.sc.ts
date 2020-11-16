import styled from 'styled-components';
import { View, Image } from 'react-native';

export const AvatarContainer = styled(View)`
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
