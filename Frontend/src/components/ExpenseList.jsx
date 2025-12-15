import { Box, VStack, Text } from '@chakra-ui/react';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses, onDelete, isDeleting, isLoading, error }) {
  if (isLoading) return <Box p={4} borderWidth="1px" borderRadius="md"><Text>Loading...</Text></Box>;
  if (error) return <Box p={4} borderWidth="1px" borderRadius="md"><Text color="red.500">{error}</Text></Box>;
  if (!expenses || expenses.length === 0) return <Box p={4} borderWidth="1px" borderRadius="md"><Text>No expenses yet</Text></Box>;

  return (
    <VStack align="stretch" spacing={3}>
      {expenses.map((exp) => (
        <ExpenseItem key={exp.id} expense={exp} onDelete={onDelete} isDeleting={isDeleting} />
      ))}
    </VStack>
  );
}
