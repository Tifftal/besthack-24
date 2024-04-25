import { TextInput, Button, PasswordInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { setUser as setUserToStore } from '../../store/UserSlice/UserSlice';
import { generatePushToken, login } from '../../api/user/index';

import styles from './LoginPage.module.scss';
import { useDispatch } from 'react-redux';


const LoginPage = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await login(form.values.email, form.values.password);

      if (res.jwtTokens) {
        localStorage.setItem('atoken', res.jwtTokens.access);
        localStorage.setItem('rtoken', res.jwtTokens.refresh);
      }

      dispatch(setUserToStore(res.data));

      const status = await generatePushToken();
      if (status === 200) {
        setError(false);
        navigate('/');
      }
    } catch (err) {
      setError(true);
    }
  };

  const navigate = useNavigate();
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: { name: '', email: '', age: 0, password: '' },
  });

  return (
    <div className={styles["login-page"]}>
      <form onSubmit={form.onSubmit(handleLogin)} className={styles["login-page-form"]}>
        <TextInput mt="sm" label="Почта" placeholder="Почта" {...form.getInputProps('email')} />
        <PasswordInput label="Пароль" placeholder="Пароль" {...form.getInputProps('password')} />
        {error && <Text color="red">Неверный логин или пароль</Text>}
        <div className={styles['login-page-form-btn']}>
          <Button type="submit" mt="sm">
            Войти
          </Button>

        </div>
        <div className={styles['login-page-form-reg']}>
          <Text>Ещё нет аккаунта?</Text>
          <NavLink to='/registration'>Зарегистрироваться</NavLink>
        </div>
        <div>
          <Text>Не заходите в свой профиль с чужих устройств</Text>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
