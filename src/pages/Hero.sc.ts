import { Text, View } from 'react-native';
import styled from 'styled-components';

export const HeroContainer = styled(View)`
  align-items: center;
  padding: 20px;
`;

export const HeroName = styled(Text)`
  font-size: ${(props) => props.theme.textSize.big};
  margin-bottom: 8px;
`;

export const HeroDescription = styled(Text)`
  font-size: ${(props) => props.theme.textSize.medium};
`;

export const HeroType = styled(HeroDescription)`
  margin-top: 16px;
  margin-bottom: 8px;
`;
