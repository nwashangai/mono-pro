import {
  UserControllerConstructorType,
  HttpStatus,
  CreateUserInput,
  TypedRequestBody,
  TypedRequestWithParams,
  ConstantsType
} from './types';
import {
  userCases,
  UserTypes,
  verificationCases,
  accountCases
} from '../../use-cases';
import Account from '../../use-cases/Account/UseCases';
import { BuildReturn as VerificationBuild } from '../../use-cases/Verification/types';

export default class UserController {
  private users: UserTypes.BuildReturn;
  private verification: VerificationBuild;
  private httpStatus: HttpStatus;
  private jwtService: any;
  private account: Account;
  private constants: ConstantsType;

  constructor({
    codeGenerator,
    httpStatus,
    jwtService,
    validation,
    passwordHash,
    models,
    emailService,
    constants,
    cryptograph,
    blockchain
  }: UserControllerConstructorType) {
    this.users = userCases({
      validation,
      passwordHash,
      models,
      httpStatus,
      constants
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
    this.account = accountCases({
      validation,
      models,
      httpStatus,
      cryptograph,
      blockchain,
      constants
    });
    this.constants = constants;
    this.startRegistration = this.startRegistration.bind(this);
    this.completeRegistration = this.completeRegistration.bind(this);
    this.login = this.login.bind(this);
    this.getUserData = this.getUserData.bind(this);
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
    const {
      body: { email, password }
    } = request;

    const user = await this.users.login(email, password);

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

  async getUserData(request: TypedRequestWithParams<{ email: string }>) {
    const {
      params: { email }
    } = request;

    const user = await this.users.getUser({ email });

    if (!user) {
      throw new Error(`{${this.httpStatus.NOT_FOUND}} user does not exist`);
    } else {
      const userWallets = await this.account.getAllWallets(
        user.getId() as string
      );

      const wallets = {};

      userWallets.forEach(wallet => {
        const walletEntity = Object.values(wallet)[0];
        wallets[Object.keys(wallet)[0]] = {
          address: walletEntity.getAddress(),
          type: walletEntity.getType(),
          dateCreated: walletEntity.getCreatedAt(),
          isBlocked: walletEntity.isBlocked()
        };
      });

      return {
        statusCode: this.httpStatus.OK,
        data: {
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          role: user.getRole(),
          lastLogin: user.getLastLogin(),
          country: user.getNationality(),
          dateJoined: user.getCreatedAt(),
          wallets
        }
      };
    }
  }
}
