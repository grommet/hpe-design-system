import { body } from 'express-validator';

const commonRules = [
  body('name').notEmpty().withMessage('Name is required.'),
];

const createRules = [
  ...commonRules,
];

const updateRules = [
  ...commonRules,
];

const updateManyRules = [
  body().isArray().withMessage('Body must be an array.'),
  body('*.id').notEmpty().withMessage('Id is required.'),
  body('*.name').notEmpty().withMessage('Name is required.'),
];

export {
  createRules,
  updateRules,
  updateManyRules,
};