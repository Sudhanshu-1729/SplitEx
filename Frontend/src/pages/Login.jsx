import { useState } from 'react';
import { Box, Button, Card, CardBody, CardHeader, Container, FormControl, FormLabel, Heading, Input, Link, Stack, useToast } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      toast({ title: err.message || 'Login failed', status: 'error', duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="md" py={12}>
      <Card boxShadow="md" borderRadius="lg">
        <CardHeader>
          <Heading size="md">Welcome back</Heading>
        </CardHeader>
        <CardBody>
          <Box as="form" onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button type="submit" colorScheme="teal" isLoading={loading}>Log In</Button>
              <Link as={RouterLink} to="/register" color="teal.500">Create an account</Link>
            </Stack>
          </Box>
        </CardBody>
      </Card>
    </Container>
  );
}
