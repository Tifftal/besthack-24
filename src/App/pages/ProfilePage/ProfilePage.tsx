import { useEffect } from 'react';
import { me } from '../../api/user/index';
import styles from './ProfilePage.module.scss';
import { Group, Avatar, Text, Modal, Button, TextInput } from '@mantine/core';
import { IconAt, IconEdit, IconHeart } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { updateUser } from '../../api/user/index';
import { NavLink } from 'react-router-dom';
import DepartmentBadge from './components/Department/DepartmentBadge';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserState } from '../../store/UserSlice/userSelector';
import { setUser } from '../../store/UserSlice/UserSlice';

const convertDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
};

export type UserInitials = {
  name: string;
  surname: string;
  middleName: string;
};

const ProfilePage = () => {
  // const [user, setUser] = useState<FullInfo>(null);
  const dispatch = useDispatch();

  const user = useSelector(selectUserState);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    me().then((res) => {
      dispatch(setUser(res));
    });
  }, []);

  const handleEdit = async (values: UserInitials) => {
    try {
      await updateUser(values);
      close();
      me().then((res) => {
        dispatch(setUser(res));
      });
    } catch (error) {
      console.error(error);
    }
  };


  const editForm = useForm({
    initialValues: {
      name: '',
      surname: '',
      middleName: '',
    },
    validate: {
      name: (value: string) => (value.length > 0 ? null : 'Введите имя'),
      surname: (value: string) => (value.length > 0 ? null : 'Введите фамилию'),
      middleName: (value: string) => (value.length > 0 ? null : 'Введите отчество'),
    },
  });

  return (
    <div className={styles['profile-page']}>
      <div className={styles['profile-page__header']}>
        <h1>Профиль</h1>

        <Button variant="outline" color="blue" component={NavLink} to="/">
          Вернуться на главную
        </Button>
      </div>
      <Modal opened={opened} onClose={close} title="Редактирование профиля" centered>
        <form onSubmit={editForm.onSubmit(handleEdit)}>
          <TextInput label="Имя" placeholder="Имя" {...editForm.getInputProps('name')} />
          <TextInput label="Фамилия" placeholder="Фамилия" {...editForm.getInputProps('surname')} />
          <TextInput label="Отчество" placeholder="Отчество" {...editForm.getInputProps('middleName')} />
          <Button mt="sm" type="submit" variant="outline" color="blue">
            Сохранить
          </Button>
        </form>
      </Modal>

      <Group wrap="nowrap">
        <Avatar size={150} radius="md" />
        <div>
          <Text fz="md" tt="uppercase" fw={700} c="dimmed">
            Software engineer
          </Text>
          <Group wrap="nowrap" gap={10} mt={5}>
            <Text fz="h1" fw={500} className={styles.name}>
              {user?.surname} {user?.name} {user?.middleName}
            </Text>
            <IconEdit stroke={1.5} size="2rem" onClick={open} className={styles.icon} />
          </Group>
          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="2rem" className={styles.icon} />
            <Text fz="lg" c="dimmed">
              {user?.username}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconHeart stroke={1.5} size="2rem" className={styles.icon} />
            <Text fz="lg" c="dimmed">
              С нами с: {convertDate(user?.createDate || '')}
            </Text>
          </Group>
        </div>
      </Group>
      <Group mt={20}>
        <Text fz="lg" fw={500}>
          Департаменты, в которых я состою:
        </Text>
        <Group mt={5}>
          {user?.departmentRoles.map((role) => (
            <DepartmentBadge key={role.department.id} department={role.department} />
          ))}
        </Group>
      </Group>
    </div>
  );
};
export default ProfilePage;
