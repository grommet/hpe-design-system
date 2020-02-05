import { ClientFunction } from 'testcafe';

export const baseUrl = 'http://localhost:3000';

export const getLocation = ClientFunction(() => document.location.href);

export const formatForTyping = ClientFunction(text => text.split('').join(' '));
