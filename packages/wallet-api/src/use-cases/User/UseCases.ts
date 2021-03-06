import {
  ConstructorType,
  IUser,
  BuildReturn,
  CreateUserInput,
  HttpStatus,
  Models,
  ObjectID
} from './types';
import { UserType } from '../../wallet/user';

export default class User {
  private DB: Models;
  private httpStatus: HttpStatus;
  private makeNewUser: UserType;

  constructor({ models, httpStatus, makeNewUser }: ConstructorType) {
    this.DB = models;
    this.httpStatus = httpStatus;
    this.makeNewUser = makeNewUser;
    this.build = this.build.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
    this.login = this.login.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  build(): BuildReturn {
    return {
      createNewUser: this.createNewUser,
      updateUserInfo: this.updateUserInfo,
      getUsers: this.getUsers,
      getUser: this.getUser,
      updatePassword: this.updatePassword,
      login: this.login
    };
  }

  async createNewUser(userInfo: CreateUserInput) {
    const user = this.makeNewUser(userInfo);
    const exist = await this.DB.users.findOne({
      email: user.getEmail()
    });

    if (exist) {
      throw new Error(`{${this.httpStatus.CONFLICT}} User email already exist`);
    }

    return this.DB.users.create({
      email: user.getEmail(),
      name: user.getName(),
      country: user.getNationality(),
      phone: user.getPhone(),
      password: user.hashPassword(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt()
    });
  }

  async login(email: string, password: string) {
    const user = await this.DB.users.findOne({ email });

    if (!user) {
      throw new Error(
        `{${this.httpStatus.NOT_FOUND}} email address does not exist`
      );
    }

    const userObj = this.makeNewUser(user);

    if (!userObj.isPasswordMatched(password, userObj.getPassword())) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} email or password is incorrect`
      );
    }

    this.DB.users.updateOne(
      { _id: new ObjectID(userObj.getId() as string) },
      {
        lastLogin: userObj.getLastLogin()
      }
    );

    return {
      id: userObj.getId() as ObjectID,
      email: userObj.getEmail(),
      name: userObj.getName(),
      country: userObj.getNationality(),
      phone: userObj.getPhone(),
      lastLogin: userObj.getLastLogin(),
      role: userObj.getRole()
    };
  }

  async updateUserInfo(_id: string, userInfo: IUser) {
    const user = this.makeNewUser({ ...userInfo, _id, updatedAt: new Date() });

    return this.DB.users.updateOne(
      { _id: user.getId() as string },
      {
        name: user.getName(),
        country: user.getNationality(),
        phone: user.getPhone(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt()
      }
    );
  }

  async updatePassword(id: string, password: string) {
    const userData = await this.DB.users.findOne({ _id: id });

    if (!userData) {
      throw new Error(
        `{${this.httpStatus.NOT_FOUND}} User with Id does not exist`
      );
    }

    const user = this.makeNewUser({
      _id: userData._id,
      ...userData,
      password,
      updatedAt: new Date()
    });

    return this.DB.users.updateOne(
      { _id: user.getId() as string },
      {
        password: user.hashPassword()
      }
    );
  }

  async getUsers(
    filter?: { [key: string]: any },
    limit?: number,
    start?: number
  ) {
    const users = await this.DB.users.find(filter || {}, {
      limit,
      start
    });

    return users.map(user => this.makeNewUser(user));
  }

  async getUser(filter: { id?: string; email?: string }) {
    const user = await this.DB.users.findOne(filter);

    return !user ? null : this.makeNewUser(user);
  }
}
