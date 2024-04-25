import { TextInput, Button, PasswordInput, Text } from '@mantine/core';
import styles from './RegistrationPage.module.scss';
import { useForm } from '@mantine/form';
import { NavLink, useNavigate } from 'react-router-dom';
import { generatePushToken, register } from '../../api/user/index';
import { useDispatch } from '../../store/store';
import { setUser } from '../../store/UserSlice/UserSlice';
import { useState } from 'react';

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
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const handleRegistration = async () => {
    try {
      const response = await register(
        form.values.username,
        form.values.password,
        form.values.name,
        form.values.middleName,
        form.values.surname,
      );

      if (response.jwtTokens) {
        localStorage.setItem('atoken', response.jwtTokens.access);
        localStorage.setItem('rtoken', response.jwtTokens.refresh);
      }

      dispatch(setUser(response));

      const status = await generatePushToken();

      if (status === 200) {
        setError(null);
        navigate('/');
      }
    } catch (error) {
      setError(true);
    }
  };

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      name: '',
      surname: '',
      middleName: '',
    },

    validate: {
      username: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      name: (value: string) => (value.length > 0 ? null : 'Введите имя'),
      surname: (value: string) => (value.length > 0 ? null : 'Введите фамилию'),
      middleName: (value: string) => (value.length > 0 ? null : 'Введите отчество'),
      password: (value: string) => (value.length > 6 ? null : 'Пароль должен быть длиннее 6 символов'),
    },
  });

  return (
    <div className={styles['reg-page']}>
      <form onSubmit={form.onSubmit(handleRegistration)} className={styles['reg-page__form']}>
        <TextInput mt="sm" label="Почта" placeholder="Почта" {...form.getInputProps('username')} />
        <TextInput mt="sm" label="Фамилия" placeholder="Фамилия" {...form.getInputProps('surname')} />
        <TextInput mt="sm" label="Имя" placeholder="Имя" {...form.getInputProps('name')} />
        <TextInput mt="sm" label="Отчество" placeholder="Отчество" {...form.getInputProps('middleName')} />
        <PasswordInput label="Пароль" placeholder="Пароль" {...form.getInputProps('password')} />
        {error && <Text color="red">Пользователь с данной почтой уже существует</Text>}
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
