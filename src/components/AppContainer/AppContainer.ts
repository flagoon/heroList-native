import styled from 'styled-components';
import { View } from 'react-native';

const AppContainer = styled(View)`
  flex: 1;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.colors.background};
`;

export default AppContainer;
