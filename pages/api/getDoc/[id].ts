import type { NextApiRequest, NextApiResponse, } from 'next'
import { getDocById } from '../../../prisma';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === 'GET'){
      if(!req.query.id || Array.isArray(req.query.id)) return res.status(400).json({error: 'No id provided'})
      const doc = await getDocById(req.query.id);
      res.status(200).json(doc);
    }

}
