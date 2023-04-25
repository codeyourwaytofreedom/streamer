// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import { createReadStream } from 'fs';
import path from 'path';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const videoPath = path.join(process.cwd(), 'excluded', 'tiger.mp4');
  const file_details = fs.statSync(videoPath);
  const fileSize = file_details.size;
  const byte_range = req.headers.range;

  if(byte_range){
    console.log("byte range received",byte_range);
    const slice = byte_range.replace(/bytes=/, '').split('-');
    console.log(slice)

    const start = parseInt(slice[0], 10);
    const end = slice[1] ? parseInt(slice[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  }
  else{
    res.status(200).json({ message: 'no range found' })
  }
}
