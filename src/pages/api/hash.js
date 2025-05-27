import { createHash } from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const fileBuffer = Buffer.concat(buffers);

    // Validate file size
    if (fileBuffer.length > 100 * 1024 * 1024) {
      return res.status(413).json({ error: 'File too large (max 100MB)' });
    }

    // Calculate hashes
    const md5 = createHash('md5').update(fileBuffer).digest('hex');
    const sha1 = createHash('sha1').update(fileBuffer).digest('hex');
    const sha256 = createHash('sha256').update(fileBuffer).digest('hex');

    res.status(200).json({ md5, sha1, sha256 });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process file' });
  }
}

export const config = {
  api: {
    bodyParser: false, 
    sizeLimit: '100mb'
  }
};