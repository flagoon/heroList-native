import CustomButton from 'components/CustomButton/CustomButton';
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

interface Props {
  errorMessage?: string;
  onButtonPress?: () => void;
}

const ErrorComponent: React.FC<Props> = ({ errorMessage, onButtonPress }) => {
  return (
    <Container>
      <ErrorTitle>Error happened!</ErrorTitle>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ErrorMessage>
        Refresh the application and check if problem persists
      </ErrorMessage>
      {onButtonPress && (
        <CustomButton onPressHandler={onButtonPress}>Go back</CustomButton>
      )}
    </Container>
  );
};

export default ErrorComponent;

export const Container = styled(View)`
  align-self: center;
  border-radius: 10px;
  margin-top: 25%;
  padding: 20px;
  width: 80%;
  background-color: ${(props) => props.theme.colors.white};
`;

export const ErrorTitle = styled(Text)`
  font-size: ${(props) => props.theme.textSize.big};
  font-weight: bold;
  color: ${(props) => props.theme.colors.error};
  margin-bottom: 20px;
`;

export const ErrorMessage = styled(Text)`
  font-size: ${(props) => props.theme.textSize.normal};
  margin-bottom: 12px;
`;
