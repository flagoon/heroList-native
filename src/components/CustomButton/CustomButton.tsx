import theme from 'globals/styles/defaultTheme';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

interface Props {
  onPressHandler: () => void;
  backgroundColor?: string;
  textColor?: string;
  textSize?: 'small' | 'normal' | 'medium' | 'big';
  textWeight?: 'light' | 'normal' | 'bold';
  children?: React.ReactNode | React.ReactNode[];
}

type ButtonContainerType = Pick<Props, 'backgroundColor'>;
type ButtonTextType = Pick<Props, 'textColor' | 'textSize' | 'textWeight'>;

const CustomButton: React.FC<Props> = ({
  onPressHandler,
  textColor = theme.colors.white,
  textSize = 'normal',
  textWeight,
  backgroundColor,
  children,
}: Props) => {
  return (
    <ButtonContainer onPress={onPressHandler} backgroundColor={backgroundColor}>
      <ButtonText
        textColor={textColor}
        textSize={textSize}
        textWeight={textWeight}
      >
        {children}
      </ButtonText>
    </ButtonContainer>
  );
};

export default CustomButton;

export const ButtonContainer = styled(TouchableOpacity)<ButtonContainerType>`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.colors.primary};
  height: 40px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled(Text)<ButtonTextType>`
  color: ${(props) => props.textColor || props.theme.colors.black};
  font-size: ${(props) => props.theme.textSize[props.textSize || 'normal']};
  font-weight: ${(props) => props.textWeight || 'normal'};
`;
