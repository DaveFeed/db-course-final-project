/* eslint-disable no-use-before-define */
const { fork } = require('child_process');
const { faker } = require('@faker-js/faker');
const axios = require('axios');

const server = fork('./src/server.js');
const counts = {
  equipments: 100,
  materials: 100,
  specifications: 30,
};
// axios.defaults.timeout = 100000;

// Listen for messages from the server process
server.on('message', async (message) => {
  if (message === 'online') {
    console.log('Server is online, starting seeding process...');

    try {
      await seed();
      console.log('Seeding complete!');
    } catch (e) {
      console.error('Fatal: ', e);
    } finally {
      // Kill the server process after making the API call
      server.kill();
    }
  }
});

async function seedEquipments() {
  const equipmentIds = [];
  const promises = Array.from({ length: counts.equipments }).map(async () => {
    const equipment = {
      name: faker.commerce.productName(),
      manufacturer: faker.company.name(),
      startDate: faker.date.past(),
      expDate: faker.date.future(),
    };

    return axios
      .post('http://localhost:3000/api/v1/equipments', equipment)
      .then((response) => equipmentIds.push(response.data.result.id));
  });

  await Promise.allSettled(promises);

  return equipmentIds;
}

async function seedMaterials() {
  const materialIds = [];
  const promises = Array.from({ length: counts.materials }).map(async () => {
    const material = {
      name: faker.commerce.productName(),
      type: faker.commerce.productMaterial(),
      price: faker.commerce.price(),
      measurementUnit: faker.commerce.productMaterial(), // todo:: (change) use a better measurement unit
    };

    return axios
      .post('http://localhost:3000/api/v1/materials', material)
      .then((response) => materialIds.push(response.data.result.id));
  });

  await Promise.allSettled(promises);

  return materialIds;
}

async function seedSpecifications(equipmentIds, materialIds) {
  const promises = Array.from({ length: counts.specifications }).map(() => {
    const specification = {
      equipmentId:
        equipmentIds[Math.floor(Math.random() * equipmentIds.length)],
      materialId: materialIds[Math.floor(Math.random() * materialIds.length)],
      quantity: faker.number.int({
        min: 1,
        max: 100,
      }),
      name: faker.commerce.productName(),
    };

    return axios.post('http://localhost:3000/api/v1/specifications', specification);
  });

  await Promise.allSettled(promises);
}

async function seed() {
  const equipmentIds = await seedEquipments();
  const materialIds = await seedMaterials();

  await seedSpecifications(equipmentIds, materialIds);
}
