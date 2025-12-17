import { useState } from 'react';
import { Box, Button, Card, CardBody, CardHeader, Container, FormControl, FormLabel, Heading, Input, Link, Stack, useToast } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(email, password, name);
      navigate('/dashboard');
    } catch (err) {
      toast({ title: err.message || 'Registration failed', status: 'error', duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="md" py={12}>
      <Card boxShadow="md" borderRadius="lg">
        <CardHeader>
          <Heading size="md">Create your account</Heading>
        </CardHeader>
        <CardBody>
          <Box as="form" onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button type="submit" colorScheme="teal" isLoading={loading}>Register</Button>
              <Link as={RouterLink} to="/login" color="teal.500">Already have an account?</Link>
            </Stack>
          </Box>
        </CardBody>
      </Card>
    </Container>
  );
}
