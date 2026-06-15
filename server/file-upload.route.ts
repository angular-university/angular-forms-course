import * as fs from 'fs';
import * as path from 'path';
import { Request, Response } from 'express';

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

export function onFileUpload(req: Request, res: Response) {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  const files = req['files'];
  if (!files || Object.keys(files).length === 0) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const file = Object.values(files)[0] as any;
  const ext = path.extname(file.name);
  const fileName = `${Date.now()}${ext}`;
  const filePath = path.join(UPLOADS_DIR, fileName);

  file.mv(filePath, (err: any) => {
    if (err) return res.status(500).json({ error: 'Upload failed.' });
    res.status(200).json({ url: `/api/uploads/${fileName}` });
  });
}
