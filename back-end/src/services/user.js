const { User } = require('../models');
const { createError } = require('../helpers');

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const create = async ({ nickname, password, avatar }) => {
  const existingUser = await User.findOne({ where: { nickname } });

  if (existingUser) {
    const error = createError('User already exists', 'alreadyExists');
    throw error;
  }

  const user = await User.create({ nickname, password, avatar });

  return user;
};

const update = async ({ id, nickname, password, avatar }) => {
  const existingUser = await User.findOne({ where: { id } });

  if (!existingUser) {
    const error = createError('User not found', 'notFound');
    throw error;
  }

  const [row] = await User.update({ nickname, password, avatar }, { where: { id } });

  return row;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};