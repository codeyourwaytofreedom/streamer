import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { join } from 'path';
import Ffmpeg from 'fluent-ffmpeg';
import { createReadStream } from "fs";
import fs from "fs";

const folderName = 'excluded';
const folderPath = path.join(process.cwd(), folderName);

//create thumbnails for all videos
/* fs.readdir(folderPath, async (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  try {
    const fileContents = await Promise.all(files.map(async (file,index) => {
      const filePath = path.join(folderPath, file);
      const thumbnailPath = path.join(process.cwd(), "excluded/thumbs", `${file.split(".")[0]}.jpg`);
      await generateThumbnail(filePath, thumbnailPath);
      return;
    }));
    
    console.log(fileContents);
  } catch (error) {
    console.error(error);
  }
}); */


// thumbnail creation function that is used above
async function generateThumbnail(videoPath: string, thumbnailPath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Ffmpeg(videoPath)
        .screenshots({
          count: 1,
          folder: path.dirname(thumbnailPath),
          filename: path.basename(thumbnailPath),
          size: '600x400',
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

  const thumbPath = path.join(process.cwd(), 'excluded/thumbs');
  const files = fs.readdirSync(thumbPath);

  const imageData = await Promise.all(
    files.map(async (name) => {
      const imagePath = join(process.cwd(), 'excluded/thumbs', name);
      const imageBuffer = await new Promise<Buffer>((resolve, reject) => {
        const stream = createReadStream(imagePath);
        const chunks: Buffer[] = [];

        stream.on('data', (chunk) => chunks.push(chunk as Buffer));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
      });
      return { name, data: imageBuffer.toString('base64') };
    })
  );


  res.status(200).json(imageData);
}





/* const vPath = path.join(process.cwd(), "excluded", "bunny.mp4");
const thumbnailPath = path.join(process.cwd(), "excluded", "thumbnail.jpg");
try {
    await generateThumbnail(vPath, thumbnailPath);
    console.log('Thumbnail generated successfully');

    // Read the thumbnail image file contents
    const thumbnailData = fs.readFileSync(thumbnailPath);

    // Set the response headers and send the file contents
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(thumbnailData);

  } catch (error) {
    console.error('Error generating thumbnail:', error);
    res.status(500).send('Error generating thumbnail');
  }
  
  const thumbPath = path.join(process.cwd(), 'excluded/thumbs');
  const files = fs.readdirSync(thumbPath);
  const images = files.map(file => `${thumbPath}/${file}`);
  console.log(images, "xxxxx")
  res.status(200).json({ images }); */