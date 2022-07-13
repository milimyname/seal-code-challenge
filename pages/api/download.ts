import type { NextApiRequest, NextApiResponse, } from 'next'
import stream from "stream";
import { promisify } from "util";
import {server} from '../../config/config';

const pipeline= promisify(stream.pipeline);



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // Only works with absolute urls
  
  const { url } = req.query;
  const response = await fetch(`${server}/img/${url}`) as any;
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader("Content-Type", "image/jpeg, image/png, image/jpg, application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${url}`);
  await pipeline(response.body, res);
}
