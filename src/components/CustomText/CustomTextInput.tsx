import React from 'react';
import { View, StyleProp, TextStyle } from 'react-native';
import {
  Container,
  ErrorText,
  IconContainer,
  StyledTextInput,
} from './CustomeTextInput.sc';

interface Props {
  error?: string;
  touched?: boolean;
  onChangeText: (value: string) => void;
  value: string;
  placeholder?: string;
  isTextArea?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  textAlignVertical?: 'top' | 'bottom';
  style?: StyleProp<TextStyle>;
  leftItem?: JSX.Element;
  rightItem?: JSX.Element;
}

const CustomTextInput: React.FC<Props> = ({
  onChangeText,
  value,
  placeholder,
  isTextArea,
  multiline,
  numberOfLines,
  textAlignVertical,
  style,
  error,
  touched,
  leftItem,
  rightItem,
}: Props) => {
  return (
    <View>
      <Container order={!!leftItem}>
        <StyledTextInput
          value={value}
          hasErrors={!!error && !!touched}
          onChangeText={onChangeText}
          isTextArea={isTextArea}
          placeholder={placeholder}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={textAlignVertical}
          style={style}
        />
        {rightItem && (
          <IconContainer iconAlign="right">{rightItem}</IconContainer>
        )}
        {leftItem && <IconContainer iconAlign="left">{leftItem}</IconContainer>}
      </Container>
      {!!error && !!touched && (
        <ErrorText hasRightItem={!!rightItem}>{error}</ErrorText>
      )}
    </View>
  );
};

export default CustomTextInput;
