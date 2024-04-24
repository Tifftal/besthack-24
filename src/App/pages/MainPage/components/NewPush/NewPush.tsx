import { useEffect, useState } from 'react';
import styles from './NewPush.module.scss';
import { RolesEnum, RolesToSelect } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { selectDepartmentState } from '../../../../store/DepartmentSlice/departmentSelector';
import { Button, Checkbox, Input, MultiSelect, Notification, Select, Textarea } from '@mantine/core';
import { setUsers } from '../../../../store/UserSlice/UserSlice';
import { getUsers } from '../../../../api/user/index';
import { selectAllUsers } from '../../../../store/UserSlice/userSelector';
import { getNotificationColor } from '../../../../helpers/getNotificationColor';

const NewPush = () => {
    const [role, setRole] = useState<RolesEnum | null>(null);
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [hasDepartment, setHasDepartment] = useState<boolean>(false);
    const [notification, setNotification] = useState<Record<string, string>>({
        title: '',
        body: '',
    })

    const dispatch = useDispatch();

    const departments = useSelector(selectDepartmentState);
    const users = useSelector(selectAllUsers);

    const formattedDepartments = departments.reduce((acc: { value: string, label: string }[], { id, name }: { id: string, name: string }) => {
        return [...acc, {
            value: id,
            label: name,
        }]
    }, []);
    // TODO: добавить хук на форматирование данных после добавления новой регистрации с ФИО
    const formattedUsers = users.reduce((acc: { value: string, label: string }[], { id, username }: { id: string, username: string }) => {
        return [...acc, {
            value: id,
            label: username,
        }]
    }, []);

    const handleSelectDepartments = (selected: string[]) => {
        setSelectedDepartments(selected);
    };

    const handleSelectUsers = (selected: string[]) => {
        setSelectedUsers(selected);
    }

    const handleCheckDepartment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasDepartment(e.target.checked);
    }

    const handleSendNotification = () => {
        
    }

    useEffect(() => {
        getUsers()
            .then(({ content }) => {
                dispatch(setUsers(content));
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className={styles['new-push']}>
            <div className={styles['push-wrapper']}>
                <div className={styles['push-controller']}>
                    <Select
                        label="Выберите позицию"
                        data={RolesToSelect}
                        defaultValue=''
                        checkIconPosition='left'

                    />

                    <MultiSelect
                        data={formattedDepartments}
                        label="Выберите департамент(ы)"
                        searchable
                        hidePickedOptions
                        onChange={handleSelectDepartments}
                    />

                    <MultiSelect
                        searchable
                        hidePickedOptions
                        label="Выберите пользователя(ей)"
                        data={formattedUsers}
                        onChange={handleSelectUsers}
                    />

                    <Checkbox
                        onChange={handleCheckDepartment}
                        label="Состоит в департаменте"
                    />

                    <Button
                        onClick={handleSendNotification}
                        disabled={!(notification.body && notification.title)}
                    >
                        Отправить уведомление
                    </Button>
                </div>
                <div className={styles['push-constructor']}>
                    <Notification
                        title={
                            <Input size='xs'
                                onChange={(e) => {
                                    setNotification({...notification, title: e.target.value})
                                }}
                            />
                        }
                        {...getNotificationColor(notification.title)}
                        className={styles['push-notification']}
                    >
                        <Textarea
                            size='xs'
                            onChange={(e) => {
                                setNotification({...notification, body: e.target.value})
                            }}
                        />
                    </Notification>
                </div>
            </div>
        </div>
    )
}

export default NewPush;