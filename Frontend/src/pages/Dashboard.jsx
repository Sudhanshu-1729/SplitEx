import { Box, Card, CardBody, CardHeader, Container, Grid, GridItem, Heading, Text } from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <Container maxW="container.lg" py={8}>
      <Heading size="lg" mb={6}>Dashboard</Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        <GridItem>
          <Card boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Heading size="sm">Personal Expenses</Heading>
            </CardHeader>
            <CardBody>
              <Text color="gray.600">Track your individual spending.</Text>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Heading size="sm">Split Expenses (Groups)</Heading>
            </CardHeader>
            <CardBody>
              <Text color="gray.600">Create groups and settle balances.</Text>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Heading size="sm">Monthly Budget</Heading>
            </CardHeader>
            <CardBody>
              <Text color="gray.600">Monitor budget and get alerts.</Text>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
}
