/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef, useCallback, useState } from 'react';
import { FiLock, FiUser, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import AppHeader from '../../components/AppHeader';

import { Container, Content, AnimationContainer, Information } from './styles';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  passwordConfirmation: string;
}

interface SearchUserData {
  login: string;
  email: string;
}

interface User {
  id: string;
  name: string;
  login: string;
  email: string;
}

const Recover: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [user, setUser] = useState<User | null>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const searchUser = useCallback(
    async (data: SearchUserData) => {
      try {
        formRef.current?.setErrors({});
        const { login, email } = data;

        if (!login && !email) {
          const errors = {
            login: 'At least one information is required',
            email: 'At least one information is required',
          };

          formRef.current?.setErrors(errors);

          return;
        }

        const schema = Yup.object().shape({
          login: Yup.string(),
          email: Yup.string().email('Write a valid email'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        api.post('/users/find', { login, email }).then(response => {
          setUser(response.data);
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Error',
          description: `${error}`,
        });
      }
    },
    [addToast],
  );

  const handleReset = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Write a valid password'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Passwords must match',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!user) {
          throw new Error('No user selected');
        }

        const { password, passwordConfirmation } = data;

        await api.post('/users/reset', {
          password,
          passwordConfirmation,
          id: user.id,
        });

        addToast({
          type: 'success',
          title: 'Account password reseted!',
        });

        history.push('/home');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Error in recovery',
          description:
            'An error have ocurred while recovering the account. Try again later',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <AppHeader />
      <Content>
        <AnimationContainer>
          {user ? (
            <>
              <Information>
                <h2>User Information:</h2>
                <p>
                  <strong>Name:&nbsp;</strong>
                  {user.name}
                </p>
                <p>
                  <strong>Login:&nbsp;</strong>
                  {user.login}
                </p>
                <p>
                  <strong>Email:&nbsp;</strong>
                  {user.email}
                </p>
              </Information>
              <Form ref={formRef} onSubmit={handleReset}>
                <h1>Reset Password</h1>

                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder="New Password"
                />

                <Input
                  name="passwordConfirmation"
                  icon={FiLock}
                  type="password"
                  placeholder="Confirm Password"
                />

                <Button color="green" type="submit">
                  Reset
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setUser(null);
                  }}
                >
                  Cancel
                </Button>
              </Form>
            </>
          ) : (
            <>
              <Information>
                <p>
                  To reset an user password, please write its login or email.
                </p>
                <span>
                  <strong>at least one is required</strong>, but you can write
                  both if you want to be more specific.
                </span>
              </Information>
              <Form ref={formRef} onSubmit={searchUser}>
                <Input
                  name="login"
                  icon={FiUser}
                  type="text"
                  placeholder="Login"
                />

                <Input
                  name="email"
                  icon={FiMail}
                  type="text"
                  placeholder="E-mail"
                />

                <Button type="submit">Search</Button>
              </Form>
            </>
          )}
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Recover;
