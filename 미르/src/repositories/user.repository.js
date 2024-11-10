import { prisma } from "../db.config.js";

export const addUser = async (data) => {
  const member = await prisma.member.findFirst({ where: { email: data.email } });
  if (member) {
    return null;
  }

  const created = await prisma.member.create({ data: data });
  return created.id;
};
 
export const getUser = async (memberId) => {
  const member = await prisma.member.findFirstOrThrow({ where: { id: memberId } });
  return member;
};

export const setPreference = async (memberId, categoryId) => {
  await prisma.memberPrefer.create({
    data: {
      memberId: memberId,
      categoryId: categoryId,
    },
  });
};

export const getUserPreferencesByUserId = async (memberId) => {
  const preferences = await prisma.memberPrefer.findMany({
    select: {
      id: true,
      memberId: true,
      categoryId: true,
      category: {
        select: {
          name: true,
        },
      },
    },
    where: { memberId: memberId },
    orderBy: { categoryId: "asc" },
  });

  return preferences;
};