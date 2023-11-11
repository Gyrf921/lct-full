import { Accordion, Image } from '@mantine/core';
import { useSelector } from 'react-redux';
import Arrow from '../../../assets/icon/Arrow.svg';
import { AddNewStage } from '../MissionAdmin/AddNewStage/AddNewStage.tsx';
import { allTaskAndStage } from '../../../API/hr/interfaces.ts';
import { RootState } from '../../../store';
import { AccordionItem } from './Accordion/AccordionItem.tsx';
import classes from './MissionAccordion.module.css';

export interface AccordionLabelProps {
  stages: allTaskAndStage[];
  idIntern: number;
}

export const MissionAccordion = ({ stages, idIntern }: AccordionLabelProps) => {
  const role = useSelector((state: RootState) => state.roles[0]);
  const items = stages.map((stage: allTaskAndStage) => (
    <AccordionItem
      stage={stage}
      key={stage.stage.stageId}
      role={role}
      idIntern={idIntern}
    />
  ));

  if (role === 'ROLE_ADMIN') {
    return (
      <>
        <Accordion
          variant='contained'
          chevronPosition='right'
          chevron={
            <Image src={Arrow} w={{ lg: '30px', md: '30px', base: '25px' }} />
          }
          w='100%'
          classNames={{
            root: classes.missionAccordion,
            item: classes.missionAccordion__admin,
            label: classes.missionAccordion__label,
            panel: classes.missionAccordion__panel,
            control: classes.missionAccordion__control,
            chevron: classes.missionAccordion__chevron,
          }}
        >
          {items}
          <AddNewStage />
        </Accordion>
      </>
    );
  }
  if (role === 'ROLE_INTERN') {
    return (
      <>
        <Accordion
          variant='contained'
          chevronPosition='right'
          chevron={
            <Image
              src={Arrow}
              w={{ lg: '30px', md: '30px', sm: '25px', xs: '20px' }}
            />
          }
          w='100%'
          classNames={{
            root: classes.missionAccordion,
            item: classes.missionAccordion__item,
            label: classes.missionAccordion__label,
            panel: classes.missionAccordion__panel,
            control: classes.missionAccordion__control,
            chevron: classes.missionAccordion__chevron,
          }}
        >
          {items}
        </Accordion>
      </>
    );
  }
};
