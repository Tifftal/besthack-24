import { TextInput, Button, PasswordInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import YaOAuthButton from './components/yaButton';
import store from '../../store';
import { IconBrandGoogleFilled } from '@tabler/icons-react';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const handlYaSuccess = (data) => {
    console.log('Сообщение с токеном: ', data);
    // Здесь можно установить состояние компонента с данными, если нужно
  };

  const handleYaError = (error) => {
    console.log('Что-то пошло не так: ', error);
    // Здесь можно обработать ошибку, если нужно
  };

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    if (user.length !== 0 && user) {
      console.log(user);
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
          store.dispatch({ type: 'SET_USER', payload: res.data });
          console.log(store.getState());
          // sent the data to the backend
          axios
            .post('http://localhost:5000/api/v1/auth/google', res.data)
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    store.dispatch({ type: 'LOGOUT' });
    setProfile(null);
  };

  const navigate = useNavigate();
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    initialValues: { name: '', email: '', age: 0 },
  });

  return (
    <div className={styles["login-page"]}>
      <form onSubmit={form.onSubmit(console.log)} className={styles["login-page-form"]}>
        <TextInput mt="sm" label="Логин" placeholder="Логин" {...form.getInputProps('email')} />
        <PasswordInput label="Пароль" placeholder="Пароль" {...form.getInputProps('password')} />
        <div className={styles['login-page-form-btn']}>
          <Button type="submit" mt="sm" onClick={() => navigate('/')}>
            Войти
          </Button>
          {profile && profile.length !== 0 ? (
            <button onClick={logOut}>Log out</button>
          ) : (
            <Button
              variant="default"
              mt="sm"
              onClick={login}
              leftSection={<IconBrandGoogleFilled />}
            >
              Войти через Google
            </Button>
          )}
        </div>
        <div className={styles['login-page-form-reg']}>
          <Text>Ещё нет аккаунта?</Text>
          <NavLink to='/registration'>Зарегестрироваться</NavLink>
        </div>
        {/* Я бы удалил эту штуку, но вдруг кто-то есть герой */}
        {/* <YaOAuthButton onSuccess={handlYaSuccess} onError={handleYaError} /> */}
      </form>
    </div>
  );
};

export default LoginPage;
