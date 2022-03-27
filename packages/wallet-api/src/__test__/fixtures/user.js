import faker from 'faker';
import cuid from 'cuid';

export function makeFakeUser(overrides) {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.exampleEmail(),
    id: cuid,
    phone: faker.phone.phoneNumber('+233#########'),
    country: 'Nigeria',
    password: '1234567',
    createdAt: faker.date.recent(),
  };

  return {
    ...user,
    ...overrides,
  };
}

export default makeFakeUser;
