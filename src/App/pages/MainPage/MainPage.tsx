import styles from './MainPage.module.scss';
import { Button, Flex, Tabs, Text, rem } from '@mantine/core';
import { IconBuilding, IconHistory, IconPlus, IconSettings } from '@tabler/icons-react';
import History from './components/History';
import Control from './components/Control';
import NewPush from './components/NewPush';
import Departments from './components/Departments';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { me } from '../../api/user/index';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserState } from '../../store/UserSlice/userSelector';
import { setUser } from '../../store/UserSlice/UserSlice';

export type UserRole = 'ROLE_EMPLOYEE' | 'ROLE_USER';

export type DepartmentReciever = {
  id: string;
  name: string;
  amountOfPeople: number;
};

export type Department = {
  id: string;
  name: string;
  amountOfPeople: number;
  canSendTo: DepartmentReciever[];
};

export type DepartmentRole = {
  user: string;
  department: Department;
  userRole: UserRole[];
};

export type FullInfo = {
  id: string;
  name: string;
  middleName: string;
  surname: string;
  username: string;
  createDate: string;
  departmentRoles: DepartmentRole[];
  globalRole: string;
} | null;

const MainPage = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUserState);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('atoken');
    localStorage.removeItem('rtoken');
    navigate('/login');
  };

  useEffect(() => {
    if (!localStorage.getItem('atoken')) {
      navigate('/login');
    }
    me().then((res) => {
      dispatch(setUser(res))
      if (res.globalRole === "ROLE_USER") {
        navigate('/profile');
      }
    });
  }, []);

  const iconStyle = { width: rem(15), height: rem(15) };

  return (
    <div className={styles['main-page']}>
      <Tabs defaultValue="history">
        <Tabs.List>
          {user.globalRole === 'ROLE_ADMIN' ? (
            <>
              <Tabs.Tab value="history" leftSection={<IconHistory style={iconStyle} />}>
                История
              </Tabs.Tab>
              <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
                Управление
              </Tabs.Tab>
            </>) : null}
          <Tabs.Tab value="new-push" leftSection={<IconPlus style={iconStyle} />}>
            Новое уведомление
          </Tabs.Tab>
          <Tabs.Tab value="departments" leftSection={<IconBuilding style={iconStyle} />}>
            Департаменты
          </Tabs.Tab>
          <Flex ml="auto" align="center" direction="row">
            <Text size="md" fw={400} mr={8}>
              Вы вошли как
            </Text>
            <NavLink to="/profile" style={{ textDecoration: "none" }}>
              <Text mr={30} fw={600} c="blue">
                {user?.surname} {user?.name} {user?.middleName}{' '}
              </Text>
            </NavLink>
            <Button variant="outline" className={styles['main-page-logout-btn']} onClick={logout}>
              Выйти
            </Button>
          </Flex>
        </Tabs.List>

        <Tabs.Panel value="history">
          <History />
        </Tabs.Panel>

        <Tabs.Panel value="settings">
          <Control />
        </Tabs.Panel>

        <Tabs.Panel value="new-push">
          <NewPush />
        </Tabs.Panel>

        <Tabs.Panel value="departments">
          <Departments />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default MainPage;
