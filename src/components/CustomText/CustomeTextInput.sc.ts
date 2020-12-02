import { TextInput, View, Text } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)<{ order?: boolean }>`
  flex-direction: ${(props) => (props.order ? 'row-reverse' : 'row')};
`;

export const StyledTextInput = styled(TextInput)<{
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
