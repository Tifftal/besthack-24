import styles from './MainPage.module.scss';
import { Button, Flex, Group, Tabs, Text, rem } from '@mantine/core';
import { IconHistory, IconPlus, IconSettings } from '@tabler/icons-react';
import History from './components/History';
import Control from './components/Control';
import NewPush from './components/NewPush';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    const iconStyle = { width: rem(15), height: rem(15) };

    return (
        <div className={styles['main-page']}>
            <Tabs defaultValue="history">
                <Tabs.List>
                    <Tabs.Tab value="history" leftSection={<IconHistory style={iconStyle} />}>
                        История
                    </Tabs.Tab>
                    <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
                        Управление аккаунтами
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
                        <Text mr={30} fw={600} c='blue'>Варвара</Text>
                        <Button variant='outline' className={styles['main-page-logout-btn']} onClick={() => navigate('/login')}>Выйти</Button>
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