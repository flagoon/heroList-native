import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { AvatarContainer } from '../Avatar.sc';

interface Props {
  thumbUrl: string;
  imageUrl: string;
  size: number;
}

const AlmostLazyImage: React.FC<Props> = ({ thumbUrl, imageUrl, size }) => {
  const thumbOpacity = React.useRef(new Animated.Value(0)).current;

  const onImageLoad = () => {
    Animated.timing(thumbOpacity, {
      toValue: 0,
      useNativeDriver: false,
      duration: 1000,
    }).start();
  };

  const onThumbLoad = () => {
    Animated.timing(thumbOpacity, {
      toValue: 1,
      useNativeDriver: false,
      duration: 1000,
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
    <AvatarContainer size={size}>
      <Animated.Image
        source={{ uri: thumbUrl }}
        style={[styles.container, { opacity: thumbOpacity }]}
        onLoad={onThumbLoad}
      />
      <Animated.Image
        source={{ uri: imageUrl }}
        style={[styles.container, styles.withPositionAbsolute]}
        onLoad={onImageLoad}
      ></Animated.Image>
    </AvatarContainer>
  );
};

export default AlmostLazyImage;
