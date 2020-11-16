import { View, Text } from 'react-native';
import styled from 'styled-components';

export const HeroContainer = styled(View)`
  margin: 4px 0;
  border-radius: 4px;
  padding: 8px;
  height: 90px;
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const HeroDetails = styled(View)`
  height: 50px;
  justify-content: space-between;
`;

export const HeroMain = styled(View)`
  flex-direction: row;
`;

export const HeroName = styled(Text)`
  font-size: ${(props) => props.theme.textSize.big};
`;

export const HeroType = styled(Text)`
  font-size: ${(props) => props.theme.textSize.normal};
`;
