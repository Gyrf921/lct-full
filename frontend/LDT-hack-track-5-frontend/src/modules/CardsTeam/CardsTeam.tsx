import { SimpleGrid } from '@mantine/core';
import { employeeTeam } from '../../API/team/interfaces.ts';
import { EmployeeCard } from '../../components/EmployeeCard/EmployeeCard';

interface CardsTeamProps {
  team: employeeTeam[];
}

export const CardsTeam = ({ team }: CardsTeamProps) => {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
      spacing='xl'
      verticalSpacing='xl'
    >
      {team.map((item: employeeTeam) => (
        <EmployeeCard key={item.employeeId} team={item} />
      ))}
    </SimpleGrid>
  );
};
