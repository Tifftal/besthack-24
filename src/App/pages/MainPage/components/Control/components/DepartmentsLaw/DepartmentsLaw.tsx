import { ActionIcon, Button, Input, MultiSelect } from '@mantine/core';
import { IconCheckbox, IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDepartmentState } from 'App/store/DepartmentSlice/departmentSelector';
import { getDepartmentById, getDepartments, updateCanSendToDepartment, updateDepartment } from 'App/api/department/index';
import { setDepartments, updateDepartments } from 'App/store/DepartmentSlice/DepatmentSlice';

import classes from './DepartmentsLaw.module.css';
import styles from './DepartmentLaw.module.scss';

const DepartmentsLaw = () => {
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

    const handleChangeName = (event: any) => {
        setInputDepartmentName(event.target.value);
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
                    setHasChanged(false)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return (
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
                    Сохранить
                </Button>
            </div>
        </div>
    )
}

export default DepartmentsLaw;