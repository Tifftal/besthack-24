import { useDisclosure } from '@mantine/hooks';
import { Popover, Text, Badge } from '@mantine/core';
import { Department } from 'App/pages/MainPage/MainPage';

export type DepartmentBadgeProps = {
    department: Department;
};

const DepartmentBadge: React.FC<DepartmentBadgeProps> = ({ department }) => {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
           <Badge variant="dot" color="orange" size="xl" radius="lg" onMouseEnter={open} onMouseLeave={close} style={{ fontWeight: '600' }}>
             {department.name}
           </Badge>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: 'none' }}>
        <Text size="sm">Количество людей работающих в депортаменте: {department.amountOfPeople}</Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export default DepartmentBadge;