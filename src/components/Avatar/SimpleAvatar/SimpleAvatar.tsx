import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';
import { AvatarContainer } from '../Avatar.sc';

interface Props {
  imageUrl: string;
  size: number;
}

const SimpleAvatar: React.FC<Props> = ({ size, imageUrl }) => {
  const [error, setError] = React.useState(false);
  return (
    <AvatarContainer size={size}>
      {error ? (
        <AvatarImage
          source={require('../../../assets/empty_avatar.png')}
          size={size}
        />
      ) : (
        <AvatarImage
          source={{ uri: imageUrl }}
          size={size}
          onError={() => setError(true)}
        />
      )}
    </AvatarContainer>
  );
};

export default SimpleAvatar;

export const AvatarImage = styled(Image)<Pick<Props, 'size'>>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
