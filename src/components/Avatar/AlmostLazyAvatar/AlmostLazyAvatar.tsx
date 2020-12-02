import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { AvatarContainer } from '../Avatar.sc';
import { HOST_IP } from 'api/CONSTS';

interface Props {
  imageUrl: string;
  size: number;
}

const AlmostLazyImage: React.FC<Props> = ({ imageUrl: url, size }) => {
  const thumbOpacity = React.useRef(new Animated.Value(0)).current;

  const imageUrl = url.replace('localhost', HOST_IP);

  const onImageLoad = () => {
    Animated.timing(thumbOpacity, {
      toValue: 0,
      useNativeDriver: false,
      duration: 100,
    }).start();
  };

  const onThumbLoad = () => {
    Animated.timing(thumbOpacity, {
      toValue: 1,
      useNativeDriver: false,
      duration: 10,
    }).start();
  };

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    withPositionAbsolute: {
      position: 'absolute',
    },
  });

  return (
    <AvatarContainer>
      <Animated.Image
        source={require('../../../assets/empty_avatar.png')}
        style={[styles.container, { opacity: thumbOpacity }]}
        onLoad={onThumbLoad}
      />
      <Animated.Image
        source={{ uri: imageUrl }}
        style={[styles.container, styles.withPositionAbsolute]}
        onLoad={onImageLoad}
      />
    </AvatarContainer>
  );
};

export default AlmostLazyImage;
