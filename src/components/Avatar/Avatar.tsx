import React from 'react';
import { HeroListAvatar, AvatarImage } from './Avatar.sc';

interface Props {
  url: string;
}

const Avatar: React.FC<Props> = ({ url }) => {
  return (
    <HeroListAvatar>
      <AvatarImage source={{ uri: url }} />
    </HeroListAvatar>
  );
};

export default Avatar;
