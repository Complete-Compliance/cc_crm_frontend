/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock, FiFileText } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import AppHeader from '../../components/AppHeader';
import Button from '../../components/Button';

import { Content } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  login: string;
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name required'),
          login: Yup.string().required('Login required'),
          email: Yup.string()
            .required('E-mail required')
            .email('Write a valid e-mail'),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: text => !!text.length,
            then: Yup.string().required('Required field'),
            otherwise: Yup.string(),
          }),
          confirmPassword: Yup.string()
            .when('oldPassword', {
              is: text => !!text.length,
              then: Yup.string().required('Required field'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], "The passwords don't match"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          login,
          oldPassword,
          password,
          passwordConfirmation,
        } = data;

        const formData = {
          name,
          email,
          login,
          ...(oldPassword
            ? {
                oldPassword,
                password,
                passwordConfirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/home');

        addToast({
          type: 'success',
          title: 'Account updated!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Update error',
          description:
            'An error have ocurred. Review the fields and try again.',
        });
      }
    },
    [addToast, history, updateUser],
  );

  return (
    <>
      <AppHeader />
      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            login: user.login,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <h1>My account</h1>
          <span>*only change the informations that you want to modify</span>

          <Input name="name" icon={FiFileText} type="text" text="Nome" />

          <Input name="login" icon={FiUser} text="E-mail" />

          <Input name="email" icon={FiMail} text="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="oldPassword"
            icon={FiLock}
            type="password"
            text="Current password"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            text="New password"
          />

          <Input
            name="confirmPassword"
            icon={FiLock}
            type="password"
            text="Confirm new password"
          />

          <Button type="submit">Update</Button>
        </Form>
      </Content>
    </>
  );
};

export default Profile;
