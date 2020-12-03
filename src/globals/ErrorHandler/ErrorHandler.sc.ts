import { View, Text } from 'react-native';
import styled from 'styled-components';

export const ErrorTitle = styled(Text)`
  color: ${(props) => props.theme.colors.primary};
  font-size: 30px;
`;

export const ErrorView = styled(View)`
  padding: 15px;
`;

export const ErrorText = styled(Text)`
  color: red;
`;
