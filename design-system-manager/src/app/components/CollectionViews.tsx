'use client';

import Link from "next/link";
import { Box, Card, CardBody, Cards, List, Heading, Paragraph } from "grommet";

export const ComponentList = () => {
  return (
    <List>
      {({ name }) => (
        <Box background="background-front">
          {name}
        </Box>
      )}
    </List>
)};

export const CardGroup = () => {
  return (
    <Cards>
      {(item) => (
        <Link href={`/components/${item.id}`} passHref legacyBehavior>
          <Card>
            <CardBody>
              <Heading level={3} margin="none">{item.name}</Heading>
              <Paragraph>{item.description}</Paragraph>
            </CardBody>
          </Card>
        </Link>
      )}
    </Cards>
)}