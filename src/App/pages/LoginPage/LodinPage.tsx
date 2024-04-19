import './LoginPage.modules.scss';
import { useForm } from '@mantine/form';
import { TextInput, Button, PasswordInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate()
    const form = useForm({
        mode: 'uncontrolled',
        validateInputOnBlur: true,
        initialValues: { name: '', email: '', age: 0 },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
    return (
        <div className='login-page'>
            <div className='login-page-img'>IMG</div>
            <div className='login-page-form'>
                <form onSubmit={form.onSubmit(console.log)} style={{ width: "100%" }}>
                    <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                    <PasswordInput
                        label="Password"
                        placeholder="Password"
                        {...form.getInputProps('password')}
                    />
                    <Button
                        type="submit"
                        mt="sm"
                        onClick={() => navigate('/')}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage