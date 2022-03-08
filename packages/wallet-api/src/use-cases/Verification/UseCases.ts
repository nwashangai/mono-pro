import {
  ConstructorType,
  Models,
  VerificationType,
  BuildReturn,
  RegisterInput
} from './types';
import buildVerificationEntityFactory, {
  RegisterReturn
} from '../../wallet/verification';

export default class Verification implements VerificationType {
  private DB: Models;
  private sendMail: (email: string, subject: string, body: string) => void;
  private verificationObject: (input: RegisterInput) => RegisterReturn;

  constructor({
    validation,
    codeGenerator,
    emailService,
    models,
    httpStatus
  }: ConstructorType) {
    this.DB = models;
    this.sendMail = emailService.sendMail;
    this.verificationObject = buildVerificationEntityFactory(
      validation,
      codeGenerator,
      httpStatus
    );
    this.build = this.build.bind(this);
    this.startRegistration = this.startRegistration.bind(this);
    this.verify = this.verify.bind(this);
    this.isCodeValid = this.isCodeValid.bind(this);
  }

  build(): BuildReturn {
    return {
      startRegistration: this.startRegistration,
      verify: this.verify,
      isCodeValid: this.isCodeValid
    };
  }

  async startRegistration(registrationInfo: RegisterInput): Promise<void> {
    const user = this.verificationObject(registrationInfo);
    const isRegistrationComplete = await this.DB.users.findOne({
      email: user.getEmail()
    });

    if (isRegistrationComplete) {
      throw new Error('{400} User with email already exist');
    }

    const isRegistrationStarted = await this.DB.verifications.findOne({
      email: user.getEmail()
    });

    if (isRegistrationStarted) {
      const { _id, ...rest } = isRegistrationStarted;
      const registration = await this.verificationObject({
        ...rest,
        _id
      } as RegisterInput);
      this.sendMail(
        registration.getEmail(),
        'Verification Code',
        `Your verification code is ${registration.getCode()}`
      );
    } else {
      await this.DB.verifications.create({
        email: user.getEmail(),
        code: user.getCode(),
        isVerified: user.isVerified(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt()
      });

      this.sendMail(
        user.getEmail(),
        'Verification Code',
        `Your verification code is ${user.getCode()}`
      );
    }
  }

  async verify(email: string): Promise<number> {
    const deletion = await this.DB.verifications.updateOne(
      {
        email: email.toLowerCase()
      },
      {
        isVerified: true
      }
    );

    return deletion.nModified;
  }

  async isCodeValid(email: string, code: string): Promise<boolean> {
    const isVerified = await this.DB.verifications.findOne({
      email: email.toLowerCase(),
      code,
      isVerified: false
    });

    return Boolean(isVerified);
  }
}
