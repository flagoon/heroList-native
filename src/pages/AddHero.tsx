import React from 'react';
import { Text, View } from 'react-native';
import Container from 'components/AppContainer/AppContainer';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation, queryCache } from 'react-query';
import { getAllTypes } from 'api';
import CustomButton from 'components/CustomButton/CustomButton';
import TypePicker from 'components/TypePicker/TypePicker';
import styled from 'styled-components';
import CustomTextInput from 'components/CustomText/CustomTextInput';
import { createHero } from 'api/apiCalls';
import useNavigation from 'helpers/useNavigationHook';
import { FontAwesome } from '@expo/vector-icons';
import HeroAvatarModal from 'components/HeroAvatarModal/HeroAvatarModal';

/**
 * Send on submit
 */

const AddHero: React.FC = () => {
  const { data: types, error: typesError } = useQuery('types', getAllTypes);

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
    // TODO: handle error better, show toast on error
    return <Text>{JSON.stringify('error')}</Text>;
  }

  return (
    <Container>
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
            {types ? (
              <TypePicker
                fieldName="type"
                types={types}
                setFieldValue={setFieldValue}
              />
            ) : null}
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
                  <FontAwesome name="plus" size={20} color="white" />
                </CustomButton>
              }
            />
            <CustomButton onPressHandler={handleSubmit}>
              <Text>Submit</Text>
            </CustomButton>
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
