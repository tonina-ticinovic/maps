import { faker } from '@faker-js/faker';

export class Company {
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };
  color: string = 'blue';

  constructor() {
    this.companyName = faker.company.name();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  getMarkerContent(): string {
    return `
      <div>
        <h3>Company Name: ${this.companyName}</h3>
        <h5>Catchphrase: ${this.catchPhrase}</h5>
      </div>
    `;
  }
}
