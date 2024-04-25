import { useEffect, useState } from 'react';
import { getHistory, getPush } from 'App/api/push';
import { Loader, Notification, Select, Text } from '@mantine/core';

import styles from './History.module.scss';
import { getNotificationColor } from '../../../../helpers/getNotificationColor';
import { getUsers } from 'App/api/user';
import { getDepartments } from 'App/api/department';
import { HistoryPush } from './types';
import { Department, FullInfo } from 'App/pages/MainPage/MainPage';

const History = ({ id }: { id?: string }) => {
    const [history, setHistory] = useState<HistoryPush[]>([]);
    const [users, setUsers] = useState<FullInfo[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [creatorUserId, setCreatorUserId] = useState<string>();
    const [fromDepartmentId, setFromDepartmentId] = useState<string>();
    const [recipients, setRecipients] = useState(new Map());

    useEffect(() => {
        getUsers({})
            .then(response => {
                setUsers(response.content)
            })
            .catch(error => {
                console.error(error)
            })

        getDepartments()
            .then(response => {
                setDepartments(response)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        let payload = {};

        if (creatorUserId) {
            payload = { ...payload, creatorId: creatorUserId };
        }

        if (fromDepartmentId) {
            payload = { ...payload, fromDepartmentId: fromDepartmentId };
        }

        if (id) {
            payload = { ...payload, toUserId: id }
        }

        getHistory(payload)
            .then(response => {
                setHistory(response?.data.content)
            })
            .catch(error => {
                console.error(error)
            })
    }, [creatorUserId, fromDepartmentId])

    useEffect(() => {
        history.forEach((item, index) => {
            setTimeout(() => {
                getPush(item.id)
                    .then(response => {
                        setRecipients(prevRecipients => new Map(prevRecipients).set(item.id, `${response?.data.history[0].toUser.surname} ${response?.data.history[0].toUser.name} ${response?.data.history[0].toUser.middleName}`));
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }, index * 1000);
        });
    }, [history]);


    function formatDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', options);
    }


    const handleSelectChange = (value: string | null) => {
        setCreatorUserId(value || '');
    };

    const handleSelectDepartmentChange = (selectedOption: string | null) => {
        setFromDepartmentId(selectedOption || '');
    };

    return (
        <div className={styles.history}>
            <div className={styles['history-filt']}>
                <Select
                    label='Отправитель'
                    placeholder='Выберите отправителя'
                    data={users
                        .filter(item => item !== null)
                        .map(item => ({
                            value: item.id,
                            label: `${item.surname} ${item.name} ${item.middleName}`
                        }))
                    }
                    onChange={handleSelectChange}
                    allowDeselect
                />
                <Select
                    label='Отделение отправки'
                    placeholder='Выберите отделение'
                    data={departments.map(item => ({
                        value: item.id,
                        label: item.name,
                    }))}
                    onChange={handleSelectDepartmentChange}
                    allowDeselect
                />
            </div>

            {history !== undefined && history?.length > 0 ? (
                history.map(push => (
                    <div className={styles['history-not']} key={push.id}>
                        <div className={styles['history-not-owner']}>
                            <div className={styles['history-not-owner-div']}>
                                <h5>Из отдела: </h5>
                                {push?.fromDepartment?.name ? (
                                    <p>{push?.fromDepartment?.name}</p>
                                ) : (
                                    <p>Администратор</p>
                                )}
                            </div>
                            <div className={styles['history-not-owner-div']}>
                                <h5>Отправитель: </h5>
                                <p>{push.creator.surname} {push.creator.name} {push.creator.middleName}</p>
                            </div>
                            <div className={styles['history-not-owner-div']}>
                                <h5>Получатель: </h5>
                                <p>
                                    {
                                        recipients.has(push.id)
                                            ? recipients.get(push.id)
                                            : <Loader color="blue" size="xs" />
                                    }
                                </p>
                            </div>
                            <div className={styles['history-not-owner-div']}>
                                <h5>Отправлено: </h5>
                                <p>{formatDate(push.time)}</p>
                            </div>
                        </div>
                        <Notification
                            key={push.id}
                            title={push.title}
                            withBorder
                            styles={{ root: { width: '60%' } }}
                            {...getNotificationColor(push.title)}
                        >
                            {push.body}
                        </Notification>
                    </div>
                ))
            ) : (
                <Text>Пусто</Text>
            )}

        </div >
    )
}

export default History;