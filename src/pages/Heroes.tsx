import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from 'components/CustomButton/CustomButton';
import styled from 'styled-components';

const Heroes: React.FC = () => (
  <Container>
    <CustomButton
      onPressHandler={() => console.log('pressed')}
      textSize="medium"
      textWeight="bold"
    >
      <Text>+ Add hero</Text>
    </CustomButton>
    <Text>Heroes list</Text>
  </Container>
);

export const Container = styled(View)`
  flex: 1;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.colors.background};
`;

export default Heroes;
