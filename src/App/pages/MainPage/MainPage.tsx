import styles from './MainPage.module.scss';
import { Button, Flex, Tabs, Text, rem } from '@mantine/core';
import { IconHistory, IconPlus, IconSettings } from '@tabler/icons-react';
import History from './components/History';
import Control from './components/Control';
import NewPush from './components/NewPush';
import { useNavigate } from 'react-router-dom';
import { test_one, test_two } from '../../api/AxiosBaseApi';
import { useEffect, useState } from 'react';
import { me } from '../../api/user/index';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserState } from '../../store/UserSlice/userSelector';
import { setUser } from '../../store/UserSlice/UserSlice';

export type UserRole = "ROLE_EMPLOYEE" | "ROLE_USER";

export type DepartmentReciever = {
    id: string,
    name: string,
    amountOfPeople: number,
}

export type Department = {
    id: string,
    name: string,
    amountOfPeople: number,
    canSendTo: DepartmentReciever[],
}

export type DepartmentRole = {
    user: string,
    department: Department,
    userRole: UserRole[],
}

export type FullInfo = {
    id: string,
    name: string,
    middleName: string,
    surname: string,
    username: string,
    createDate: string,
    departmentRoles: DepartmentRole[],
    globalRole: string
} | null;

const MainPage = () => {

    // const [user, setUser] = useState<FullInfo>(null); // [1]
    const dispatch = useDispatch();

    const user = useSelector(selectUserState)

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
            // setUser(res);
            dispatch(setUser(res))
            console.log(res);
        });
    }, []);

    const iconStyle = { width: rem(15), height: rem(15) };

    return (
        <div className={styles['main-page']}>
            <Tabs defaultValue="history">
                <Tabs.List>
                    <Tabs.Tab value="history" leftSection={<IconHistory style={iconStyle} />}>
                        История
                    </Tabs.Tab>
                    <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
                        Управление
                    </Tabs.Tab>
                    <Tabs.Tab value="new-push" leftSection={<IconPlus style={iconStyle} />}>
                        Новое уведомление
                    </Tabs.Tab>
                    <Flex
                        ml="auto"
                        align="center"
                        direction="row"
                    >
                        <Text size="md" fw={400} mr={8}>Вы вошли как</Text>
                        <Text mr={30} fw={600} c='blue'>{user?.surname} {user?.name} {user?.middleName} </Text>
                        <Button variant='outline' className={styles['main-page-logout-btn']} onClick={logout}>Выйти</Button>
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
            </Tabs>
        </div >
    );
}

export default MainPage