// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import { createReadStream } from 'fs';
import path from 'path';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const videoPath = path.join(process.cwd(), 'public', 'tiger.mp4');
  const file_details = fs.statSync(videoPath);
  const fileSize = file_details.size;

  console.log(req.body)
  res.status(200).json({ message: 'to be included later' })
}
