import type { NextApiRequest, NextApiResponse, } from 'next'
import stream from "stream";
import { promisify } from "util";
import {server} from '../../config/config';
import { getDocById } from '../../prisma';

const pipeline= promisify(stream.pipeline);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // Only works with absolute urls
  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    res.status(400).json({ error: 'Missing id' });
    return;
  }

  const doc = await getDocById(id);
  const response = await fetch(`${doc?.url[0]}`) as any;
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader("Content-Type", "image/jpeg, image/png, image/jpg, application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${doc?.name[0]}`);
  await pipeline(response.body, res);
}
