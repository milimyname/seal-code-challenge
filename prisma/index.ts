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

// Get All Docs 
export const getAllDocs = async () => {
    return await prisma.doc.findMany();
}

// Get A Doc by Id
export const getDocById = async (id: string) => {
  return await prisma.doc.findUnique({
      where: {
          id,
      },
  });
}


// Delete All Docs
export const deleteAll = async () => {
  return await prisma.doc.deleteMany();
}

