import { body } from 'express-validator';

const commonRules = [
  body('name').notEmpty().withMessage('Name is required.'),
];

const createRules = [
  ...commonRules,
];

const updateRules = [
  body('id').notEmpty().withMessage('ID is required.'),
  ...commonRules,
];

export {
  createRules,
  updateRules,
};