const faker = require('faker');

const generateDummyData = () => {
  const dummyRecords = Array.from({ length: 20 }, () => ({
    reservationId: faker.random.uuid(),
    guestMemberId: faker.random.uuid(),
    guestName: faker.name.findName(),
    hotelName: faker.company.companyName(),
    arrivalDate: faker.date.future().toString(),
    departureDate: faker.date.future().toString(),
    status: faker.random.arrayElement(['active', 'cancelled']),
    baseStayAmount: faker.random.number({ min: 100, max: 1000 }),
    taxAmount: faker.random.number({ min: 10, max: 100 }),
  }));

  return dummyRecords;
};

const dummyData = generateDummyData();
console.log(dummyData);