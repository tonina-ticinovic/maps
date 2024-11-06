import { faker } from '@faker-js/faker';

export class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  // we want to randomly generate a name and location
  //   constructor(name: string, location: { lat: number; lng: number }) {
  //     this.name = name;
  //     this.location = location;
  //   }

  constructor() {
    this.name = faker.name.fullName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }
}
