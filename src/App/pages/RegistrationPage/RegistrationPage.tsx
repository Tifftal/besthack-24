import { TextInput, Button, PasswordInput } from '@mantine/core';
import styles from './RegistrationPage.module.scss';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
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
    <div className={styles['red-page']}>
      <div className={styles['red-page__form']}>
        <form onSubmit={form.onSubmit(handleRegistration)} style={{ width: '100%' }}>
          <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('username')} />
          <PasswordInput label="Password" placeholder="Password" {...form.getInputProps('password')} />
          <Button type="submit" mt="sm">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
