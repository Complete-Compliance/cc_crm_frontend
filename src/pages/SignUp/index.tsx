import React, { useCallback, useRef } from 'react';
import {
  FiArrowLeft,
  FiMail,
  FiUser,
  FiLock,
  FiFileText,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/cc_logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimatedContent, Background } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  login: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name required'),
          login: Yup.string().required('Username required'),
          email: Yup.string()
            .required('E-mail required')
            .email('Write a valid e-mail'),
          password: Yup.string().min(6, 'Password must have at least 6 digits'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], "Password don't match")
            .required("Password don't match"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, login, password } = data;

        await api.post('/users', {
          name,
          email,
          login,
          type: 'user',
          password,
        });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Registration completed!',
          description: 'Now you can login!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Registration Error',
          description:
            'An error have occured in registration. Try again, please.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimatedContent>
          <img src={logoImg} alt="CCCRM" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Account data</h1>

            <Input name="name" icon={FiUser} type="text" placeholder="Name" />
            <Input
              name="login"
              icon={FiFileText}
              type="text"
              placeholder="Username"
            />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />
            <Input
              name="confirmPassword"
              icon={FiLock}
              type="password"
              placeholder="Confirm password"
            />

            <Button type="submit">SignUp</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Back to login
          </Link>
        </AnimatedContent>
      </Content>
    </Container>
  );
};

export default SignUp;
