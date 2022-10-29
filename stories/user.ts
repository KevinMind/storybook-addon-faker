import {faker} from '@faker-js/faker';

export interface User {
  name: string;
}

export function mockUser(): User {
  return {
    name: faker.name.fullName(),
  };
}
