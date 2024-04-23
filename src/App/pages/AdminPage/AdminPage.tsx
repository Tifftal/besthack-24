import styles from './AdminPage.module.scss';
import { Button, Group, Tabs, Text, rem } from '@mantine/core';
import { IconHistory, IconPlus, IconSettings } from '@tabler/icons-react';

const AdminPage = () => {
    const iconStyle = { width: rem(15), height: rem(15) };
    return (
        <div className={styles['admin-page']}>
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
                    <Group ml="auto">
                        <Text size="md" fw={500}>This is h4 title</Text>
                        <Button variant='outline' className={styles['admin-page-logout-btn']}>Выйти</Button>
                    </Group>
                </Tabs.List>

                <Tabs.Panel value="history">
                    Gallery tab content
                </Tabs.Panel>

                <Tabs.Panel value="settings">
                    Messages tab content
                </Tabs.Panel>

                <Tabs.Panel value="new-push">
                    Settings tab content
                </Tabs.Panel>
            </Tabs>
        </div>
    );
}

export default AdminPage