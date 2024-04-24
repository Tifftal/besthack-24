import { Button, Input, MultiSelect } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Accordion } from '@mantine/core';
import { Department } from './types';
import { ActionIcon } from '@mantine/core';
import { IconEdit, IconCheckbox } from '@tabler/icons-react';

import styles from './Control.module.scss';
import classes from './Control.module.css';
import { createDepartment, getDepartmentById, getDepartments, updateCanSendToDepartment, updateDepartment } from 'App/api/department/index';
import { useDispatch, useSelector } from 'react-redux';
import { addDepartment, setDepartments, updateDepartments } from '../../../../store/DepartmentSlice/DepatmentSlice';
import { selectDepartmentState } from '../../../../store/DepartmentSlice/departmentSelector';

const Control = () => {
    const [inputValue, setInputValue] = useState('');
    const [department, setDepartment] = useState<Department>();
    const [isEdit, setIsEdit] = useState<boolean>(true)
    const [inputDepartmentName, setInputDepartmentName] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [hasChanged, setHasChanged] = useState(false);

    const dispatch = useDispatch();
    const departments = useSelector(selectDepartmentState);

    const handleMultiSelectChange = (selected: string[]) => {
        setSelectedDepartments(selected);
        setHasChanged(true)
    };

    const handleChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleChangeName = (event: any) => {
        setInputDepartmentName(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (inputValue !== '') {
            createDepartment(inputValue)
                .then(({ data }) => {
                    setInputValue('');
                    dispatch(addDepartment(data))
                })

                .catch(error => {
                    console.log(error)
                })
        }
    };

    useEffect(() => {
        getDepartments()
            .then(response => {
                dispatch(setDepartments(response))

            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const GetDepartmentById = (id: string) => {
        getDepartmentById(id)
            .then(response => {
                setDepartment(response)
                setInputDepartmentName(response.name)
                response.canSendTo !== undefined ? setSelectedDepartments(response.canSendTo?.map((item: { id: string; }) => item.id)) : setSelectedDepartments([]);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const EditDepartmentName = (id: any, name: string) => {
        if (typeof id === 'string' && name !== department?.name) {
            updateDepartment(id, name)
                .then(response => {
                    dispatch(updateDepartments(response))
                })
                .catch(error => {
                    console.log(error)
                })
        }
        setIsEdit(state => !state)
    }

    const ChangeCanSendToList = (id: string | undefined, department: string[]) => {
        if (id !== undefined) {
            updateCanSendToDepartment(id, department)
                .then(response => {
                    dispatch(updateDepartments(response.data))
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return (
        <div className={styles.control}>
            <Accordion variant="separated" defaultValue="new_department">
                <Accordion.Item key='new_department' value='new_department'>
                    <Accordion.Control>Добавить новый отдел</Accordion.Control>
                    <Accordion.Panel>
                        <form onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                placeholder="Название отдела"
                                value={inputValue}
                                onChange={handleChange}
                            />
                            <Button type="submit" mt={10}>Создать</Button>
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
                                        item.name === '' ? null :
                                            <button
                                                key={item.id}
                                                onClick={() => GetDepartmentById(item.id)}
                                                style={{ color: item.id === department?.id ? "#ac5b39" : 'black' }}
                                            >
                                                {item.name}
                                            </button>
                                    ))
                                }
                            </div>
                            <div className={styles['control-law-info']}>
                                <Input.Wrapper label="Название">
                                    <Input
                                        color='green'
                                        rightSectionPointerEvents="all"
                                        classNames={{ input: classes.input }}
                                        value={inputDepartmentName}
                                        disabled={isEdit}
                                        onChange={handleChangeName}
                                        rightSection={
                                            isEdit ? <ActionIcon
                                                variant="transparent"
                                                onClick={() => setIsEdit(state => !state)}
                                            >
                                                <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.8} />
                                            </ActionIcon>
                                                : <ActionIcon
                                                    variant="transparent"
                                                    onClick={() => EditDepartmentName(department?.id, inputDepartmentName)}
                                                >
                                                    <IconCheckbox style={{ width: '70%', height: '70%' }} stroke={1.8} color='green' />
                                                </ActionIcon>
                                        }
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Количество сотрудников">
                                    <Input
                                        classNames={{ input: classes.input }}
                                        value={department?.amountOfPeople}
                                        disabled
                                    />
                                </Input.Wrapper>
                                <MultiSelect
                                    label="Могут отправлять push-уведомления"
                                    placeholder="Выберете отдел"
                                    data={departments.map(item => {
                                        return {
                                            value: item.id,
                                            label: item.name
                                        }
                                    })}
                                    searchable
                                    hidePickedOptions
                                    maxDropdownHeight={200}
                                    onChange={handleMultiSelectChange}
                                    value={selectedDepartments}
                                />
                                <Button
                                    styles={{ root: { display: hasChanged ? 'block' : 'none' } }}
                                    onClick={() => ChangeCanSendToList(department !== undefined ? department.id : undefined, selectedDepartments)}
                                >
                                    Сохранить</Button>
                            </div>
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
                                    department !== undefined ? departments.map(item => (
                                        item.name === '' ? null : <button >{item.name}</button>
                                    )) : null
                                }
                            </div>
                            <div className={styles['control-law-info']}>
                                <p>test</p>
                                {/* <p>{department.id}</p> */}
                            </div>
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
export default Control;
