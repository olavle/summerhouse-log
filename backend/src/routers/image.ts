import { Router } from 'express';
import multer from 'multer';

const router = Router();

const upload = multer({
  dest: 'public',
});

router.post('/upload', upload.single('upload'), (_req, res, _next) => {
  res.status(200).end();
});

export default router;
