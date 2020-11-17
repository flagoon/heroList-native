import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import styled from 'styled-components';

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
    <AvatarContainer size={200}>
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

export const AvatarContainer = styled(View)<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  border: 2px solid black;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.white};
`;
