import { faker } from "@faker-js/faker/locale/en";

export interface User {
  name: string;
}

export function mockUser(): User {
  return {
    name: faker.name.fullName(),
  };
}
