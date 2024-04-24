import styles from './Control.module.scss';
import { Button, Input } from '@mantine/core';
import { useState, useEffect } from 'react';
import { AddDepartment, GetDepartment } from '../../api/api';
import { Accordion } from '@mantine/core';
import { Department } from './types';

const Control = () => {
    const [inputValue, setInputValue] = useState('');
    const [departments, setDepartments] = useState<Department[]>([]);

    const handleChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (inputValue !== '') {
            AddDepartment(inputValue);
            console.log('Введенное значение:', inputValue);
        }
    };

    const GetDepartments = () => {
        GetDepartment()
            .then(response => {
                setDepartments(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        GetDepartments();
    }, [])

    return (
        <div className={styles.control}>
            <Accordion variant="separated" defaultValue="new_department">
                <Accordion.Item key='new_department' value='new_department'>
                    <Accordion.Control>Добавить новый отдел</Accordion.Control>
                    <Accordion.Panel>
                        <form onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                placeholder="Input component"
                                value={inputValue}
                                onChange={handleChange}
                            />
                            <Button type="submit" mt={10}>Submit</Button>
                        </form>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key='law_dep' value='law_dep'>
                    <Accordion.Control>Права отделов</Accordion.Control>
                    <Accordion.Panel>
                        <div className={styles['control-law']}>
                            <div className={styles['control-law-departments']}>
                                <Input placeholder='Поиск' />
                                {
                                    departments.map(item => (
                                        item.name === '' ? null : <button>{item.name}</button>
                                    ))
                                }
                            </div>
                            <div></div>
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key='law_user' value='law_user'>
                    <Accordion.Control>Права пользователей</Accordion.Control>
                    <Accordion.Panel>
                        <div className={styles['control-law']}>
                            <div className={styles['control-law-departments']}>
                                <Input placeholder='Поиск' />
                                {
                                    departments.map(item => (
                                        item.name === '' ? null : <button>{item.name}</button>
                                    ))
                                }
                            </div>
                            <div></div>
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
export default Control;
