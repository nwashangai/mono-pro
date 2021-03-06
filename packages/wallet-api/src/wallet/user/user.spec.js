/* eslint-disable no-undef */
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import hashPassword from '../../infra/hashPassword';
import validation from '../../infra/validation';
import makeFakeUser from '../../__test__/fixtures/user';
import buildUserFactory from './';

const { hash, isHashMatched } = hashPassword({ bcrypt });

let createUser = buildUserFactory(
  validation(),
  hash,
  isHashMatched,
  httpStatus
);
describe('Test user Entity', () => {
  beforeEach(() => {
    createUser = buildUserFactory(
      validation(),
      hash,
      isHashMatched,
      httpStatus
    );
  });

  it('must have a name', () => {
    const user = makeFakeUser({ name: null });
    expect(() => createUser(user)).toThrow('{400} User must have a valid name');
  });

  it('must have a valid email', () => {
    const user = makeFakeUser({ email: 'young' });
    expect(() => createUser(user)).toThrow(
      '{400} User must have a valid email'
    );
  });

  it('must have a valid phone with country code', () => {
    const user = makeFakeUser({ phone: '09023456187' });
    expect(() => createUser(user)).toThrow(
      '{400} User must have a valid phone number'
    );
  });

  it('must have a valid nationality if provided', () => {
    const user = makeFakeUser({ country: 'ch' });
    expect(() => createUser(user)).toThrow(
      '{400} User must have a valid nationality'
    );
  });

  it('may not have a valid nationality', () => {
    const user = makeFakeUser({ country: null });
    const userObj = createUser(user);
    expect(userObj.getNationality()).toBe(null);
  });

  it('may not have an invalid password', () => {
    const user = makeFakeUser({ password: '1234' });
    expect(() => createUser(user)).toThrow(
      '{400} User must have a strong password'
    );
  });

  it('may not have an invalid role', () => {
    const user = makeFakeUser({ role: 'super' });
    expect(() => createUser(user)).toThrow('{400} User must have a valid role');
  });

  it('is createdAt now in UTC', () => {
    const user = makeFakeUser({});
    const userObj = createUser(user);
    expect(new Date(userObj.getCreatedAt()).toUTCString().substring(26)).toBe(
      'GMT'
    );
    expect(userObj.getPassword()).toBe('1234567');
  });
});
