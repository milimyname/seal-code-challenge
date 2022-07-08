// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import mime from 'mime'
import * as datefns from 'date-fns'
import {join} from 'path';
import { mkdir, stat } from "fs/promises";
import { createDoc } from "../../prisma";

// Disallow body parsing, consume as stream
export const config = {
  api: {
    bodyParser: false, 
  },
};

type Data = {
  data: {
    name: string | string[],
    url: string | string[];
} | null;
}

// Formidable Middleware

const parseForm = async (req: NextApiRequest): Promise<{fields: formidable.Fields, files: formidable.Files[] | formidable.Files}> => {
  return await new Promise(
    async(resolve, reject) =>{
      
      const uploadDir = join(
        process.cwd(),
        `/uploads/${datefns.format(Date.now(), "dd-MM-Y")}`
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
    const file = Array.isArray(files) ? files.map(f => f.media as formidable.File) : files.media;
    let url = Array.isArray(file) ? file.map((f)=> f.filepath) : file.filepath;
    let name = Array.isArray(file) ? file.map((f)=> f.newFilename) : file.newFilename;
    url = Array.isArray(url) ? url : [url];
    name = Array.isArray(name) ? name : [name];

    // Post it to the database
    createDoc({name, url});

    res.status(200).json({
      data: {
        name,
        url
      },
    });
    
    
  }
  
}
