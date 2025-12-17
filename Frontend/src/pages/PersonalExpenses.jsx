import { useEffect, useState } from 'react';
import { Container, Heading, VStack, Box, useToast } from '@chakra-ui/react';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import Summary from '../components/Summary.jsx';
import { fetchExpenses, addExpense, deleteExpense } from '../services/api.js';

export default function PersonalExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchExpenses();
        setExpenses(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Failed to load expenses');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAdd = async (payload) => {
    setSubmitting(true);
    try {
      const created = await addExpense(payload);
      setExpenses((prev) => [created, ...prev]);
      toast({ title: 'Expense added', status: 'success', duration: 2000 });
    } catch (err) {
      toast({ title: err.message || 'Failed to add expense', status: 'error', duration: 3000 });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      toast({ title: 'Expense deleted', status: 'success', duration: 2000 });
    } catch (err) {
      toast({ title: err.message || 'Failed to delete expense', status: 'error', duration: 3000 });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack align="stretch" spacing={6}>
        <Heading size="lg">Personal Expenses</Heading>
        <ExpenseForm onAdd={handleAdd} isSubmitting={submitting} />
        <Summary expenses={expenses} />
        <Box>
          <ExpenseList expenses={expenses} onDelete={handleDelete} isDeleting={deleting} isLoading={loading} error={error} />
        </Box>
      </VStack>
    </Container>
  );
}
