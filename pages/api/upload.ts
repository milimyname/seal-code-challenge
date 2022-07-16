// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, } from 'next'
import { createDoc, getAllDocs, deleteAll } from "../../prisma";

// Disallow body parsing, consume as stream
// export const config = {
//   api: {
//     bodyParser: false, 
//   },
// };

type Data = {
  data: {
    name: string | string[],
    url: string | string[],
} | string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if(req.method === 'POST') {
    const { name, url } = req.body;
    
    // Post it to the database
    await createDoc({name, url});

    res.status(200).json({
      data: 'Successfully posted to database',
    });
  
  }

  if(req.method === 'GET'){
    const docs = await getAllDocs()
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
