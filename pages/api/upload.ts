// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, } from 'next'
import formidable from 'formidable'
import mime from 'mime'
import * as datefns from 'date-fns'
import {join} from 'path';
import { mkdir, stat } from "fs/promises";
import { createDoc, getDoc, deleteAll } from "../../prisma";

// Disallow body parsing, consume as stream
export const config = {
  api: {
    bodyParser: false, 
  },
};

type Data = {
  data: {
    name: string | string[],
    url: string | string[],
} | string;
}

// Formidable Middleware

const parseForm = async (req: NextApiRequest): Promise<{fields: formidable.Fields, files: formidable.Files[] | formidable.Files}> => {
  return await new Promise(
    async(resolve, reject) =>{
      
      const uploadDir = join(
        process.cwd(),
        `./public/uploads/${datefns.format(Date.now(), "dd-MM-Y")}`
      );
  
      try {
        await stat(uploadDir);
      } catch (e: any) {
        if (e.code === "ENOENT") {
          await mkdir(uploadDir, { recursive: true });
        } else {
          console.error(e);
          reject(e);
          return;
        }
      }
  
      let filename = ""; //  To avoid duplicate upload
      const form = formidable({
        multiples: true,
        maxFiles: 5,
        maxFileSize: 5 * 1024 * 1024, // 5mb
        uploadDir,
        filename: (_name, _ext, part) => {
  
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          filename = `${_name || "unknown"}-${uniqueSuffix}.${
            mime.getExtension(part.mimetype || "") || "unknown"
          }`;
          return filename;
        }
      });
  
      form.parse(req, function (err, fields, files) {
        if (err) reject(err);
        else resolve({ fields, files });
      });
      
    }
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if(req.method === 'POST') {
    const { files } = await parseForm(req);
    // Map each files array to a media file
    const file = Array.isArray(files) ? files.map(f => f.media as formidable.File) : files.media;
    // Get url and new name
    let url = Array.isArray(file) ? file.map((f)=> f.filepath.replace('/Users/mili.myname/Desktop/seal-code-challenge/public/uploads/https://drive.google.com/file/d/1sByZPzcpxS8p1l64F21JjoDD5I298YJT/view?usp=sharing', '')) : file.filepath.replace('/Users/mili.myname/Desktop/seal-code-challenge/public/uploads/https://drive.google.com/file/d/1sByZPzcpxS8p1l64F21JjoDD5I298YJT/view?usp=sharing', '');
    let name = Array.isArray(file) ? file.map((f)=> f.newFilename) : file.newFilename;
    // Make sure url and name are arrays
    url = Array.isArray(url) ? url : [url];
    name = Array.isArray(name) ? name : [name];

    // Post it to the database
    await createDoc({name, url});

    res.status(200).json({
      data: {
        name,
        url
      },
    });
    
    
  }

  if(req.method === 'GET'){
    const docs = await getDoc()
    res.status(200).json({
      data: JSON.stringify(docs),
    });
  }

  if(req.method === 'DELETE'){
    const docs = await deleteAll();
    res.status(200).json({
      data: 'Deleted all',
    });
  }

  
}
