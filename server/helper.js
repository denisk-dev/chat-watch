/**
 * author: Denis Kravchenko
 */
let allUsers = [];

const addUser = (id, name, room) => {
  let user = { id, name, room };

  allUsers.push(user);

  return user;
};

const findUser = (id) => {
  return allUsers.find((user) => user.id === id);
};

module.exports = { addUser, findUser };
