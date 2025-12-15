import { Box, Text } from '@chakra-ui/react';

export default function Summary({ expenses }) {
  const total = (expenses || []).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Text fontWeight="bold">Total: ${total.toFixed(2)}</Text>
    </Box>
  );
}
