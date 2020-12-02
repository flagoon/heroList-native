import styled, { css } from 'styled-components';
import { View, Image, TouchableOpacity } from 'react-native';

const avatarBoundingBox = css<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

export const AvatarImage = styled(Image)`
  ${avatarBoundingBox};
  border-radius: ${(props) => props.size / 2}px;
`;

export const AvatarContainer = styled(View)`
  margin: 4px;
`;

export const AvatarPlaceholder = styled(AvatarContainer)`
  ${avatarBoundingBox};
  opacity: 0;
`;

export const CustomAvatar = styled(TouchableOpacity)`
  ${avatarBoundingBox};
  justify-content: center;
  align-items: center;
`;
