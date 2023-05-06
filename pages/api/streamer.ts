// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import { createReadStream } from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffprobeStatic from 'ffprobe-static';

ffmpeg.setFfprobePath(ffprobeStatic.path);

export  default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.headers.file)
  const videoPath = path.join(process.cwd(), 'excluded', `${req.headers.file}`);
  const file_details = fs.statSync(videoPath);
  const fileSize = file_details.size;
  const byte_range = req.headers.range;

  ffmpeg.ffprobe(videoPath, (err, metadata) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(metadata)
  });
  if(byte_range){
    console.log("byte range received",byte_range);
    const slice = byte_range.replace(/bytes=/, '').split('-');
    console.log(slice)

    const start = parseInt(slice[0], 10);
    const end = slice[1] ? parseInt(slice[1], 10) : fileSize - 1;
    const chunksize = end - start;
    const file = createReadStream(videoPath, ({ start, end }));
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      //'Content-Type': 'video/mp4; codecs="avc1.42E01E, mp4a.40.2""',
    };
    res.writeHead(206, head);
    file.pipe(res);
  }
  else{
    const head = {
        'Content-Length': fileSize,
        //'Content-Type': 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
      };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
}




