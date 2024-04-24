import { Accordion } from '@mantine/core';
import NewDepartment from './components/NewDepartment';

import styles from './Control.module.scss';
import DepartmentsLaw from './components/DepartmentsLaw';


const Control = () => {
    return (
        <div className={styles.control}>
            <Accordion variant="separated" defaultValue="new_department">
                <Accordion.Item key='new_department' value='new_department'>
                    <Accordion.Control>Добавить новый отдел</Accordion.Control>
                    <Accordion.Panel>
                        <NewDepartment />
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key='law_dep' value='law_dep'>
                    <Accordion.Control>Права отделов</Accordion.Control>
                    <Accordion.Panel>
                        <DepartmentsLaw />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
export default Control;
