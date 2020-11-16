import React from 'react';
import { AvatarContainer, AvatarImage } from './Avatar.sc';

interface Props {
  url: string;
}

const Avatar: React.FC<Props> = ({ url }) => {
  return (
    <AvatarContainer>
      <AvatarImage source={{ uri: url }} />
    </AvatarContainer>
  );
};

export default Avatar;
