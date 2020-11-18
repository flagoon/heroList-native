import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import styled from 'styled-components';

interface Props {
  types: HeroType[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  fieldName: string;
}

const TypePicker: React.FC<Props> = ({ types, setFieldValue, fieldName }) => {
  const [pickerId, setPickerId] = React.useState(types[0].id);

  React.useEffect(() => {
    setFieldValue(fieldName, pickerId);
  }, [fieldName, pickerId, setFieldValue]);

  return (
    <StyledView>
      <StyledPicker
        selectedValue={pickerId}
        onValueChange={(value) => {
          if (typeof value === 'string') {
            setPickerId(value);
            setFieldValue(fieldName, pickerId);
          }
        }}
      >
        {types.map((type) => (
          <Picker.Item key={type.id} value={type.id} label={type.name} />
        ))}
      </StyledPicker>
    </StyledView>
  );
};

export default TypePicker;

export const StyledPicker = styled(Picker)`
  height: 40px;
  font-size: ${(props) => props.theme.textSize.small};
`;
export const StyledView = styled(View)`
  background-color: ${(props) => props.theme.colors.white};
  color: red;
  border-radius: 4px;
`;
