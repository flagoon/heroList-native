import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';
import { AvatarContainer } from '../Avatar.sc';

interface Props {
  imageUrl: string;
  size: number;
}

const SimpleAvatar: React.FC<Props> = ({ size, imageUrl }) => {
  return (
    <AvatarContainer size={size}>
      <AvatarImage source={{ uri: imageUrl }} size={size} />
    </AvatarContainer>
  );
};

export default SimpleAvatar;

export const AvatarImage = styled(Image)<Pick<Props, 'size'>>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
`;
