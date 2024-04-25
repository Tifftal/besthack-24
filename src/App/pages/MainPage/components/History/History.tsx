import { useEffect, useState } from 'react';
import { getHistory } from 'App/api/push';
import { Notification, Select } from '@mantine/core';

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

    useEffect(() => {
        getUsers({})
            .then(response => {
                setUsers(response.content)
            })
            .catch(error => {
                console.log(error)
            })

        getDepartments()
            .then(response => {
                setDepartments(response)
            })
            .catch(error => {
                console.log(error)
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
                console.log("HISTORY", response?.data.content)
                setHistory(response?.data.content)
            })
            .catch(error => {
                console.log("HERE")
                console.log(error)
            })
    }, [creatorUserId, fromDepartmentId])

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
        if (value) {
            setCreatorUserId(value);
        }
    };

    const handleSelectDepartmentChange = (selectedOption: string | null) => {
        if (selectedOption) {
            setFromDepartmentId(selectedOption);
        }
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
                    value={creatorUserId}
                />
                <Select
                    label='Отделение отправки'
                    placeholder='Выберите отделение'
                    data={departments.map(item => ({
                        value: item.id,
                        label: item.name,
                    }))}
                    onChange={handleSelectDepartmentChange}
                    value={fromDepartmentId}
                />
            </div>

            {
                history !== undefined &&
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
                            {/* <div className={styles['history-not-owner-div']}>
                                <p>{getRecipient(push.id)}</p>
                                <h5>Получатель: </h5>
                                <p>{push.creator.surname} {push.creator.name} {push.creator.middleName}</p>
                            </div> */}
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
            }

        </div >
    )
}

export default History;