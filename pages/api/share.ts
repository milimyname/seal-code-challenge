import type { NextApiRequest, NextApiResponse, } from 'next'
import jwt from 'jsonwebtoken'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {


    const token = jwt.sign(req.body, 'secret', { expiresIn: '1h' });

    if(req.method === 'POST'){
        res.status(200).json(token);
    }


}
