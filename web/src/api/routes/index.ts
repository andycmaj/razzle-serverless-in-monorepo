import { Request, Response, Router } from 'express';
import { debug } from 'shared/log';

export const router = Router();

router.get('/auth/:provider', (req: Request, res: Response) => {
  debug('API:Auth:TestEvent')

  res.json({'code': 'ok'})
});
