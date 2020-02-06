import { ClientFunction } from 'testcafe';

export const baseUrl = 'http://localhost:3000';

export const getLocation = ClientFunction(() => document.location.href);

export const formatForTyping = ClientFunction(text => text.split('').join(' '));

export const repeatKeyPress = ClientFunction((key, number) => {
  // Array.join puts the argument between the array elements,
  // so we need to add 1
  return Array(number + 1).join(`${key} `);
});
