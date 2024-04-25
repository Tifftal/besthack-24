import { useEffect, useState } from 'react';
import styles from './NewPush.module.scss';
import { RolesEnum, RolesToSelect } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { selectDepartmentState } from '../../../../store/DepartmentSlice/departmentSelector';
import { Button, Input, MultiSelect, Notification, Select, Textarea } from '@mantine/core';
import { setUsers } from '../../../../store/UserSlice/UserSlice';
import { getUsers, getUsersAllowedToSend } from '../../../../api/user/index';
import { selectAllUsers, selectIsUserAdmin, selectUsersDepartments } from '../../../../store/UserSlice/userSelector';
import { getNotificationColor } from '../../../../helpers/getNotificationColor';
import { sendPushNotification } from '../../../../api/push/index';
import { SendNotification } from '../../../../api/push/types';

const NewPush = () => {
    const [role, setRole] = useState<RolesEnum | string>('');
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [department, setDepartment] = useState<string>('');
    const [hasDepartment, setHasDepartment] = useState<boolean | null>(false);
    const [departureDepartment, setDepartureDepartment] = useState<string>('');
    const [notification, setNotification] = useState<Record<string, string>>({
        title: '',
        body: '',
    })

    const dispatch = useDispatch();

    const isUserAdmin = useSelector(selectIsUserAdmin);
    const departments = useSelector(selectDepartmentState);
    const usersDepartments = useSelector(selectUsersDepartments);
    const users = useSelector(selectAllUsers);

    const isAllowedToSend = !(notification.body && notification.title && (departureDepartment || isUserAdmin) && (selectedUsers || selectedDepartments))

    // @ts-expect-error
    const formattedDepartments = departments.reduce((acc: { value: string, label: string }[], { id, name }: { id: string, name: string }) => {
        return [...acc, {
            value: id,
            label: name,
        }]
    }, []);
    
    // @ts-expect-error
    const formattedUsers = users.reduce((acc: { value: string, label: string }[], { id, username, name, surname, middleName }: { id: string, username: string }) => {
        const formattedUser = {
            value: id,
            label: '',
        }

        if (name || middleName || surname) {
            formattedUser.label = `${surname} ${middleName} ${name}`

            return [...acc, formattedUser];
        }

        return [...acc, { ...formattedUser, label: username }]
    }, []);

    const formattedUsersDepartments = usersDepartments.reduce((acc: { value: string, label: string }[], { department }: { department: any }) => {
        const { id, name } = department;

        return [...acc, {
            value: id,
            label: name
        }]
    }, []);

    const handleSelectDepartments = (selected: string[]) => {
        setSelectedDepartments(selected);
    };

    const handleSelectUsers = (selected: string[]) => {
        setSelectedUsers(selected);
    }

    const handleSelectDepartureDepartment = (selected: string | null) => {
        if (selected) {
            setDepartureDepartment(selected);
        }
    }

    const handleSelectRole = (selected: string | null) => {
        if (selected) {
            setRole(selected);
        }
    }

    const handleSelectHasDepartment = (select: string | null) => {
        if (select === "null") {
            setHasDepartment(null)   
        }

        if (select === "true") {
            setHasDepartment(true)
        }

        if (select === "false") {
            setHasDepartment(false);
        }
    }

    const handleSelectDepartment = (selected: string | null) => {
        if (selected) {
            setDepartment(selected);
        }
    }

    const handleSendNotification = () => {
        const toDepartmentRoles = selectedDepartments.reduce((acc: { departmentId: string, roles?: string[] }[], department) => {
            return [...acc, {
                departmentId: department,
                roles: role === '' ? [] : new Array(role)
            }];
        }, [])

        const toUserId = selectedUsers.reduce((acc: { userId: string }[], user) => {
            return [...acc, {
                userId: user,
            }]
        }, []);

        const payload = {
            ...notification,
            toDepartmentRoles: [
                ...toDepartmentRoles
            ],
            toUserId: [
                ...toUserId
            ]
        }

        sendPushNotification(payload as SendNotification, departureDepartment)
    }

    useEffect(() => {
        if (isUserAdmin) {
            getUsers({
                hasDepartment: hasDepartment,
                role: role,
                departmentId: null,
            })
                .then(({ content }) => {
                    dispatch(setUsers(content));
                })
        } else {
            if (!departureDepartment) {
                return;
            }

            getUsersAllowedToSend({
                hasDepartment: hasDepartment,
                role: role,
                departmentId: departureDepartment,
            })
                .then(({ content }) => {
                    dispatch(setUsers(content));
                })
        }
    }, [hasDepartment, role, department]);

    return (
        <div className={styles['new-push']}>
            <div className={styles['push-wrapper']}>
                <div className={styles['push-controller']}>
                    <Select
                        label="Выберите позицию"
                        data={RolesToSelect}
                        onChange={handleSelectRole}
                        defaultValue=''
                        checkIconPosition='left'
                    />
                    {!isUserAdmin ? (
                        <Select
                            onChange={handleSelectDepartureDepartment}
                            data={formattedUsersDepartments}
                            label="Выберите деп-нт отправки"
                            searchable
                        />
                    ) : null}

                    <MultiSelect
                        data={formattedDepartments}
                        label="Выберите деп-нт(ы) назначения"
                        searchable
                        hidePickedOptions
                        onChange={handleSelectDepartments}
                    />

                    <Select
                        label="Фильтр по деп-нту"
                        onChange={handleSelectDepartment}
                        data={formattedDepartments}
                        defaultValue=''
                        checkIconPosition='left'
                        searchable
                    />

                    <MultiSelect
                        searchable
                        hidePickedOptions
                        label="Выберите пользователя(ей)"
                        data={formattedUsers}
                        onChange={handleSelectUsers}
                    />

                    <Select
                        onChange={handleSelectHasDepartment}
                        label="Состоит в департаменте"
                        data={
                            [{
                                value: 'true',
                                label: 'Состоит в департаменте'
                            }, {
                                value: 'false',
                                label: 'Не состоит в департаменте'
                            }]
                        }
                        defaultValue={
                            'false'
                        }
                    />

                    <Button
                        onClick={handleSendNotification}
                        disabled={isAllowedToSend}
                    >
                        Отправить уведомление
                    </Button>
                </div>
                <div className={styles['push-constructor']}>
                    <Notification
                        title={
                            <Input size='xs'
                                onChange={(e) => {
                                    setNotification({ ...notification, title: e.target.value })
                                }}
                                placeholder='Вы можете использовать ключевые слова: Важно, Срочно'
                            />
                        }
                        {...getNotificationColor(notification.title)}
                        className={styles['push-notification']}
                    >
                        <Textarea
                            size='xs'
                            onChange={(e) => {
                                setNotification({ ...notification, body: e.target.value })
                            }}
                        />
                    </Notification>
                </div>
            </div>
        </div>
    )
}

export default NewPush;