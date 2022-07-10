import type { NextApiRequest, NextApiResponse, } from 'next'
import stream from "stream";
import { promisify } from "util";

const pipeline= promisify(stream.pipeline);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // Only works with absolute urls
  
  const { url } = req.query;
  const response = await fetch(`./uploads/${url}`) as any;
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=dummy.pdf");
  await pipeline(response.body, res);
}
