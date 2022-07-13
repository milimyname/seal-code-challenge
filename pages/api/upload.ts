// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, } from 'next'
import formidable from 'formidable'
import mime from 'mime'
import { createDoc, getDoc, deleteAll } from "../../prisma";
import { server } from '../../config/config';

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
      
      const uploadDir = `${server}/img`;
  
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
    let url = Array.isArray(file) ? file.map((f)=> f.filepath) : file.filepath;
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
    await deleteAll();
    res.status(200).json({
      data: 'Deleted all',
    });
  }

  
}
