// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

type Data = {
  data: Object,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if(req.method === 'POST') {

    const file = fs.readFileSync(req.file.path);
    const encode_img = file.toString('base64');
    const final_img = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_img,'base64')
    };
   
    res.status(200).json(req.body)
  }

  // if(req.method === 'GET') {
  //   res.status(200).json({
  //     firstName: 'John',
  //     lastName: 'Doe'
  //   })
  // }
  
}
