import React from 'react';
import { View, TextInput, StyleProp, TextStyle, Text } from 'react-native';
import styled from 'styled-components';

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
      {leftItem && <IconContainer iconAlign="right">{leftItem}</IconContainer>}
      {!!error && !!touched && <ErrorText>{error}</ErrorText>}
    </View>
  );
};

export default CustomTextInput;

const StyledTextInput = styled(TextInput)<{
  isTextArea?: boolean;
  hasErrors: boolean;
}>`
  ${(props) => props.hasErrors && 'border: 1px solid red'}
  background-color: ${(props) => props.theme.colors.white};
  height: ${(props) => (!props.isTextArea ? '40px' : 'auto')};
  font-size: 16px;
  color: black;
  border-radius: 4px;
  padding: 4px 8px 0;
`;

export const ErrorText = styled(Text)`
  position: absolute;
  right: 14px;
  top: 10px;
  color: red;
`;

export const IconContainer = styled(View)<{ iconAlign: 'left' | 'right' }>`
  position: absolute;
  width: 40px;
  align-self: ${(props) =>
    props.iconAlign === 'left' ? 'flex-start' : 'flex-end'};
`;
