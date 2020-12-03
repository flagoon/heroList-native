import React from 'react';
import { Text, View } from 'react-native';
import Container from 'components/AppContainer/AppContainer';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation, queryCache } from 'react-query';
import { getAllTypes } from 'api';
import CustomButton from 'components/CustomButton/CustomButton';
import TypePicker from 'components/TypePicker/TypePicker';
import styled, { useTheme } from 'styled-components';
import CustomTextInput from 'components/CustomText/CustomTextInput';
import { createHero } from 'api/apiCalls';
import useNavigation from 'helpers/useNavigationHook';
import { FontAwesome } from '@expo/vector-icons';
import HeroAvatarModal from 'components/HeroAvatarModal/HeroAvatarModal';
import ErrorComponent from 'components/ErrorComponent/ErrorComponent';
import Spinner from 'react-native-loading-spinner-overlay';

/**
 * Send on submit
 */

const AddHero: React.FC = () => {
  const theme = useTheme();
  const spinnerTextColor = {
    color: theme.colors.white,
  };
  const { data: types, isLoading: typesLoading, error: typesError } = useQuery<
    HeroType[],
    Error
  >('types', getAllTypes);

  const [createHeroMutation] = useMutation(createHero, {
    onSuccess: () => {
      queryCache.invalidateQueries('heroes');
    },
  });

  const initialValues: Omit<Hero<string>, 'id'> = {
    full_name: '',
    description: '',
    avatar_url: '',
    type: '',
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string()
      .min(2, 'Too short')
      .max(50, 'Too long!')
      .required('Required!'),
    avatar_url: Yup.string().required('Required!'),
  });

  const { toHeroesPage } = useNavigation();

  const [showModal, setShowModal] = React.useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  if (typesError) {
    return (
      <ErrorComponent
        errorMessage={typesError.message}
        onButtonPress={toHeroesPage}
      />
    );
  }

  return (
    <Container>
      <Spinner
        color={theme.colors.white}
        textStyle={spinnerTextColor}
        textContent="Loading types"
        visible={typesLoading}
      />
      <AddHeroTitle>AddHero</AddHeroTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            if (typeof values.type === 'string') {
              await createHeroMutation({ ...values, type: values.type });
              toHeroesPage();
            }
          } catch (error) {
            console.log(error);
          }
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <FormContainer>
            <CustomTextInput
              error={errors.full_name}
              touched={touched.full_name}
              onChangeText={handleChange('full_name')}
              value={values.full_name}
              placeholder={'Full name'}
            />
            <TypePicker
              fieldName="type"
              types={types || [{ id: '1', name: 'Choose type...' }]}
              setFieldValue={setFieldValue}
            />
            <CustomTextInput
              isTextArea
              onChangeText={handleChange('description')}
              value={values.description}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              placeholder="Descriptions"
            />
            <CustomTextInput
              error={errors.avatar_url}
              touched={touched.avatar_url}
              onChangeText={handleChange('avatar_url')}
              value={values.avatar_url}
              placeholder="Avatar url"
              leftItem={
                <CustomButton onPressHandler={handleShowModal}>
                  <FontAwesome
                    name="plus"
                    size={20}
                    color={theme.colors.white}
                  />
                </CustomButton>
              }
            />
            <CustomButton onPressHandler={handleSubmit}>Submit</CustomButton>
            {showModal ? (
              <HeroAvatarModal
                onCloseButtonHandler={handleShowModal}
                onAvatarClick={(url) => {
                  setFieldValue('avatar_url', url);
                  handleShowModal();
                }}
                avatarSize={100}
              />
            ) : null}
          </FormContainer>
        )}
      </Formik>
    </Container>
  );
};

export default AddHero;

export const AddHeroTitle = styled(Text)`
  font-size: ${(props) => props.theme.textSize.big};
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

export const FormContainer = styled(View)`
  height: 360px;
  justify-content: space-between;
  padding: 20px;
`;
