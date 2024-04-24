import { useState } from 'react';
import { createDepartment } from 'App/api/department/index';
import { useDispatch } from 'react-redux';
import { addDepartment } from 'App/store/DepartmentSlice/DepatmentSlice';
import { Button, Input } from '@mantine/core';

const NewDepartment = () => {
    const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch();



    const handleChange = (event: any) => {
        setInputValue(event.target.value);
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
    return (
        <form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Название отдела"
                value={inputValue}
                onChange={handleChange}
            />
            <Button type="submit" mt={10}>Создать</Button>
        </form>
    )
}

export default NewDepartment;