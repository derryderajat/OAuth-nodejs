const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const prismaClient = prisma;
const userModel = prisma.user;

module.exports = { userModel, prismaClient };
