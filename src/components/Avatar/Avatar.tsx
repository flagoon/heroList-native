import React from 'react';
import { AvatarContainer, AvatarImage } from './Avatar.sc';

interface Props {
  url: string;
}

const Avatar: React.FC<Props> = ({ url }) => {
  const [error, setError] = React.useState(false);
  return (
    <AvatarContainer>
      {error ? (
        <AvatarImage
          size={50}
          source={require('../../assets/empty_avatar.png')}
        />
      ) : (
        <AvatarImage
          size={50}
          source={{ uri: url }}
          onError={() => setError(true)}
        />
      )}
    </AvatarContainer>
  );
};

export default Avatar;
