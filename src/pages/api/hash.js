import { createHash } from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const fileBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      req.on('data', (chunk) => chunks.push(chunk));
      req.on('end', () => resolve(Buffer.concat(chunks)));
      req.on('error', reject);
    });

    // Calculate hashes
    const md5 = createHash('md5').update(fileBuffer).digest('hex');
    const sha1 = createHash('sha1').update(fileBuffer).digest('hex');
    const sha256 = createHash('sha256').update(fileBuffer).digest('hex');

    res.status(200).json({ md5, sha1, sha256 });
  } catch (error) {
    console.error('Hash calculation error:', error);
    res.status(500).json({ error: 'Failed to calculate hashes' });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable default bodyParser to handle file upload
  },
};