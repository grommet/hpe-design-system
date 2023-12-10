'use client';

import Link from "next/link";
import { Box, Card, CardBody, Cards, List, Heading, Paragraph } from "grommet";
import { ComponentType, LevelType } from "@/utilities/types";
import { use, useEffect } from "react";

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

function delay(item, ms: number) {
  return setTimeout(() => 
  {
  return (<Link href={`/components/${item.id}`} passHref legacyBehavior>
  <Card animation="fadeIn">
    <CardBody>
      <Heading level={3} margin="none">{item.name}</Heading>
      <Paragraph>{item.description}</Paragraph>
    </CardBody>
  </Card>
</Link>)}, ms);
}

export const CardGroup = ({level, ...rest} : {level: LevelType}) => {
  return (
    <Cards {...rest}>
      {(item, index) => {
        const DELAY = 50;

        return(
          <Link href={`/components/${item.id}`} passHref legacyBehavior>
            <Card animation={{ type: 'fadeIn', delay: index * DELAY }}>
              <CardBody>
                <Heading level={level} margin="none">{item.name}</Heading>
                <Paragraph>{item.description}</Paragraph>
              </CardBody>
            </Card>
          </Link>
        );
      }}
    </Cards>
)}