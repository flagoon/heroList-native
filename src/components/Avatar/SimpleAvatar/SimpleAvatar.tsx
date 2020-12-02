import React from 'react';
import { AvatarContainer, AvatarImage } from '../Avatar.sc';

interface Props {
  imageUrl: string;
  size: number;
}

const SimpleAvatar: React.FC<Props> = ({ size, imageUrl }) => {
  const [error, setError] = React.useState(false);
  return (
    <AvatarContainer>
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
