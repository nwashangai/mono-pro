import {
  UserControllerConstructorType,
  HttpStatus,
  CreateUserInput,
  TypedRequestBody
} from './types';
import { userCases, UserTypes, verificationCases } from '../../use-cases';
import { BuildReturn as VerificationBuild } from '../../use-cases/Verification/types';

export default class UserController {
  private users: UserTypes.BuildReturn;
  private verification: VerificationBuild;
  private httpStatus: HttpStatus;
  private jwtService: any;

  constructor({
    codeGenerator,
    httpStatus,
    jwtService,
    validation,
    passwordHash,
    models,
    emailService
  }: UserControllerConstructorType) {
    this.users = userCases({
      validation,
      passwordHash,
      models,
      httpStatus
    });
    this.verification = verificationCases({
      validation,
      codeGenerator,
      emailService,
      models,
      httpStatus
    });
    this.httpStatus = httpStatus;
    this.jwtService = jwtService;
    this.startRegistration = this.startRegistration.bind(this);
    this.completeRegistration = this.completeRegistration.bind(this);
    this.login = this.login.bind(this);
  }

  async startRegistration(request: TypedRequestBody<{ email: string }>) {
    await this.verification.startRegistration({ email: request.body.email });
    return {
      statusCode: this.httpStatus.CREATED,
      data: {
        message: 'check your for verification code'
      }
    };
  }

  async completeRegistration(
    request: TypedRequestBody<Omit<CreateUserInput, 'role'> & { code: string }>
  ) {
    const { body: payload } = request;

    const isValid = await this.verification.isCodeValid(
      payload.email,
      payload.code
    );

    if (!isValid) {
      throw new Error(`{${this.httpStatus.BAD_REQUEST}} invalid code or email`);
    }

    await this.users.createNewUser(payload);
    await this.verification.verify(payload.email);

    return {
      statusCode: this.httpStatus.CREATED,
      data: {
        message: 'Registration is successful'
      }
    };
  }

  async login(request: TypedRequestBody<{ email: string; password: string }>) {
    const { body: payload } = request;

    const user = await this.users.login(payload.email, payload.password);

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
      lastLogin: user.lastLogin,
      role: user.role
    });

    return {
      statusCode: this.httpStatus.CREATED,
      data: {
        token,
        userId: user.id,
        email: user.email,
        name: user.name,
        lastLogin: user.lastLogin,
        role: user.role
      }
    };
  }
}
