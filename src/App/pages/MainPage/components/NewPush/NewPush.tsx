import { useEffect, useState } from 'react';
import styles from './NewPush.module.scss';
import { RolesEnum } from './types';
import { useSelector } from 'react-redux';
import { selectDepartmentState } from '../../../../store/DepartmentSlice/departmentSelector';
import { MultiSelect } from '@mantine/core';
import { UserState } from '../../../../store/UserSlice/UserSlice';
import { getUsers } from '../../../../api/user/index';

const NewPush = () => {
    const [role, setRole] = useState<RolesEnum | null>(null);
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [users, setUsers] = useState<{label: string, value: string}[]>([]);

    const departments = useSelector(selectDepartmentState)

    const formattedDepartments = departments.reduce((acc: Record<string, string>[], { id, name }: { id: string, name: string }) => {
        return [...acc, {
            value: id,
            label: name,
        }]
    }, []);

    const handleSelectDepartments = (selected: string[]) => {
        setSelectedDepartments(selected);
    };

    const handleSelectUsers = (selected: string[]) => {
        
    }

    useEffect(() => {
        getUsers()
            .then(({ content }) => {
                const formattedUsers = content.reduce((acc: Record<string, string>[], { id, username }: { id: string, username: string }) => {
                    return [...acc, {
                        value: id,
                        label: username,
                    }]
                }, []);

                setUsers(formattedUsers);
            })
            .catch(err => console.error(err));
    }, []);

    console.log(users);

    return (
        <div className={styles['new-push']}>
            <div className={styles['push-wrapper']}>
                <div className={styles['push-controller']}>
                    <MultiSelect
                        data={formattedDepartments}
                        label={"Выберите департамент(ы)"}
                        searchable
                        hidePickedOptions
                        onChange={handleSelectDepartments}
                    />

                    <MultiSelect
                        searchable
                        hidePickedOptions
                        label={"Выберите пользователя(ей)"}
                        data={users}
                        onChange={handleSelectUsers}
                    />
                </div>
                <div>

                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default NewPush;