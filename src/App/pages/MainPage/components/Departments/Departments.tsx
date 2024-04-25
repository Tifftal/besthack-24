import { Group, Table, Text } from '@mantine/core';
import GraphComponent from './components/Graph';
import { useState, useEffect } from 'react';
import { Department } from '../../MainPage';
import { getDepartments } from '../../../../api/department';

const Departments = () => {
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    getDepartments().then((res) => {
      setDepartments(res);
    });
  }, []);

  const rows = departments.map((d) => (
    <Table.Tr key={d.id} style={department === d.id ? { backgroundColor: '#f4f4f4' } : {}}>
      <Table.Td>{d.name}</Table.Td>
      <Table.Td>{d.amountOfPeople}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', textAlign: 'center' }}>
        <GraphComponent departments={departments} changeDepartment={setDepartment} />
        <Text>Перемещайте мышь с зажатой ЛКМ для взаимодействия</Text>
      </div>
      <Group m="sm">
        <Table miw={300}>
          <Table.Thead>
            <Table.Tr >
              <Table.Th>Отдел</Table.Th>
              <Table.Th>Количество сотрудников</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Group>
    </div>
  );
};

export default Departments;
