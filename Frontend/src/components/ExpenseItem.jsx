import { Flex, Box, Text, Button } from '@chakra-ui/react';

export default function ExpenseItem({ expense, onDelete, isDeleting }) {
  return (
    <Flex p={3} borderWidth="1px" borderRadius="md" align="center" justify="space-between" gap={3}>
      <Box>
        <Text fontWeight="bold">${expense.amount.toFixed(2)} — {expense.category}</Text>
        <Text fontSize="sm" color="gray.600">{expense.date}</Text>
        {expense.note && <Text fontSize="sm">{expense.note}</Text>}
      </Box>
      <Button colorScheme="red" size="sm" onClick={() => onDelete(expense.id)} isLoading={isDeleting}>
        Delete
      </Button>
    </Flex>
  );
}
