import { ConstructorType } from './types';
import Verification from './UseCases';

export default ({
  validation,
  codeGenerator,
  emailService,
  models,
  httpStatus
}: ConstructorType) => {
  return new Verification({
    validation,
    codeGenerator,
    emailService,
    models,
    httpStatus
  }).build();
};
