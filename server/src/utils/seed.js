import faker from 'faker';

import User from '../models/User';
import { ROLES } from './constants';

export const seedDb = async () => {
  console.log('Seeding database...');

  await User.deleteMany({});

  // create 3 users
  const usersPromises = [...Array(3).keys()].map((index, i) => {
    const user = new User({
      provider: 'email',
      username: `user${index}`,
      email: `email${index}@email.com`,
      password: '123456789',
      name: faker.name.findName(),
    });

    // if (index === 0) {
    //   user.role = ROLES.ADMIN;
    // }
    // if (index === 1) {
    //   user.role = ROLES.GUEST;
    // }
    return user;
  });

  await Promise.all(
    usersPromises.map(async (user) => {
      try{
        await user.registerUser(user);
      }catch(err){
        console.log("error while seeding")
      }
    }),
  );
};
