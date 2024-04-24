import { TextInput, Button, PasswordInput, Text } from '@mantine/core';
import styles from './RegistrationPage.module.scss';
import { useForm } from '@mantine/form';
import { NavLink, useNavigate } from 'react-router-dom';
import store from '../../store';
import { register } from '../../api/user/index';

export type RegResponse = {
  id: string;
  mail: string;
  username: string;
  status: string;
  jwtTokens: {
    access: string;
    refresh: string;
  };
} | null;

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleRegistration = () => {
    register(form.values.username, form.values.password)
      .then((response) => {
        if (response.jwtTokens) {
          localStorage.setItem('atoken', response.jwtTokens.access);
          localStorage.setItem('rtoken', response.jwtTokens.refresh);
        }
        store.dispatch({ type: 'SET_USER', payload: response });
        store.getState();
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value: string) => (value.length > 6 ? null : 'Пароль должен быть длиннее 6 символов'),
    },
  });

  return (
    <div className={styles['reg-page']}>
      <form onSubmit={form.onSubmit(handleRegistration)} className={styles['reg-page__form']}>
        <TextInput
          mt="sm"
          label="Имя пользователя"
          placeholder="Имя пользователя"
          {...form.getInputProps('username')}
        />
        <PasswordInput label="Пароль" placeholder="Пароль" {...form.getInputProps('password')} />
        <div className={styles['reg-page__form-btn']}>
          <Button type="submit" mt="sm">
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles['reg-page__form-login']}>
          <Text>Уже зарегистрированы?</Text>
          <NavLink to="/login">Войти</NavLink>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
