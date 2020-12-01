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

export const Container = styled(View)<{ order?: boolean }>`
  flex-direction: ${(props) => (props.order ? 'row-reverse' : 'row')};
`;

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
  flex: 1;
`;

export const ErrorText = styled(Text)<{ hasRightItem: boolean }>`
  position: absolute;
  right: ${(props) => (props.hasRightItem ? '62px' : '14px')};
  top: 9px;
  color: red;
  background-color: ${(props) => props.theme.colors.white};
  padding: 3px 10px;
`;

export const IconContainer = styled(View)<{ iconAlign: 'left' | 'right' }>`
  ${(props) =>
    props.iconAlign === 'left'
      ? 'margin-left: 0; margin-right: 8px'
      : 'margin-left: 8px; margin-right: 0'};
  width: 40px;
  align-self: ${(props) =>
    props.iconAlign === 'left' ? 'flex-start' : 'flex-end'};
`;
