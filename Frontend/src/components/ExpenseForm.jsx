import { useState } from 'react';
import { Box, Flex, Input, Button, Select, Text, FormControl, FormLabel } from '@chakra-ui/react';

export default function ExpenseForm({ onAdd, isSubmitting }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      setError('Amount is required');
      return;
    }
    if (!category.trim()) {
      setError('Category is required');
      return;
    }
    const payload = { amount: parsedAmount, category: category.trim(), date: date || new Date().toISOString().slice(0, 10), note: note.trim() };
    await onAdd(payload);
    setAmount('');
    setCategory('');
    setDate('');
    setNote('');
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth="1px" borderRadius="md">
      <Flex gap={3} direction={{ base: 'column', md: 'row' }}>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select placeholder="Select category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormControl>
        <FormControl flex={{ base: 'unset', md: 1 }}>
          <FormLabel>Note</FormLabel>
          <Input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional" />
        </FormControl>
      </Flex>
      {error && (
        <Text color="red.500" mt={2}>{error}</Text>
      )}
      <Flex mt={4} justify="flex-end">
        <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>Add Expense</Button>
      </Flex>
    </Box>
  );
}
