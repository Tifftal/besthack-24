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
                <Accordion.Item key='law' value='law'>
                    <Accordion.Control>Редактировать права</Accordion.Control>
                    <Accordion.Panel>
                        <div className={styles['constrol-law']}>
                            <div>
                                {
                                    departments.map(item => (<p>{item.name}</p>))
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
