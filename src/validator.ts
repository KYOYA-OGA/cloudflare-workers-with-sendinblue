import { Validator } from '@cfworker/json-schema';

const validator = new Validator({
  type: 'object',
  required: ['name', 'email', 'message'],
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    message: { type: 'string', minLength: 1 },
  },
});

export function validate(input: any) {
  const { valid, errors } = validator.validate(input);

  const errorsList = errors.map((err) => {
    return {
      type: err.keyword,
      message: err.error,
    };
  });

  return { valid, errors: errorsList };
}
