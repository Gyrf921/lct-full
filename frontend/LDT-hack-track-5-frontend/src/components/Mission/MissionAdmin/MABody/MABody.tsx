import { Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MissionMap } from '../../MissionMap/MissionMap.tsx';
import { MissionAccordion } from '../../MissionAccordion/MissionAccordion.tsx';
import { getInternTasks } from '../../../../API/curator';
import { allTaskAndStage } from '../../../../API/hr/interfaces.ts';

export const MaBody = () => {
  const [stage, setStage] = useState<allTaskAndStage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const idIntern = Number(useParams().articleId);
  useEffect(() => {
    Promise.all([getInternTasks(idIntern)])
      .then(([res]) => {
        setStage(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <>
      {isLoading ? (
        ''
      ) : (
        <Flex direction='column' align='center'>
          <MissionMap stage={stage} />
          <MissionAccordion stages={stage} idIntern={idIntern} />
        </Flex>
      )}
    </>
  );
};
