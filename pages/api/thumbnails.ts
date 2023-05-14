import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import Ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

async function generateThumbnail(videoPath: string, thumbnailPath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Ffmpeg(videoPath)
        .screenshots({
          count: 1,
          folder: path.dirname(thumbnailPath),
          filename: path.basename(thumbnailPath),
          size: '320x240',
        })
        .on('end', () => {
          console.log('Thumbnail created successfully!');
          resolve();
        })
        .on('error', (err:any) => {
          console.error('Error creating thumbnail:', err);
          reject(err);
        });
    });
  }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const vPath = path.join(process.cwd(), "excluded", "bunny.mp4");
    const thumbnailPath = path.join(process.cwd(), "excluded", "thumbnail.jpg");
    try {
        await generateThumbnail(vPath, thumbnailPath);
        console.log('Thumbnail generated successfully');

        // Read the thumbnail image file contents
        const thumbnailData = fs.readFileSync(thumbnailPath);

        // Set the response headers and send the file contents
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(thumbnailData);

        res.send(thumbnailPath);
      } catch (error) {
        console.error('Error generating thumbnail:', error);
        res.status(500).send('Error generating thumbnail');
      }
}





