import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create Doc File
export const createDoc = async ({name, url} : {name: string[]; url:string[]}) => {
  return await prisma.doc.create(
    {
        data: {
            name,
            url,
            updatedAt: new Date(),

    }
}
  )
};

// Get Doc File
export const getDoc = async () => {
    return await prisma.doc.findMany();
}

export const deleteAll = async () => {
  return await prisma.doc.deleteMany();
}