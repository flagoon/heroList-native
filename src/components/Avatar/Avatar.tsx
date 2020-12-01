import React from 'react';
import { HeroListAvatar, AvatarImage } from './Avatar.sc';

interface Props {
  url: string;
}

const Avatar: React.FC<Props> = ({ url }) => {
  const [error, setError] = React.useState(false);
  return (
    <HeroListAvatar>
      {error ? (
        <AvatarImage source={require('../../assets/empty_avatar.png')} />
      ) : (
        <AvatarImage source={{ uri: url }} onError={() => setError(true)} />
      )}
    </HeroListAvatar>
  );
};

export default Avatar;
