import { sayHello } from '@ajabhijeet21-internal/core-lib';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handleApiHelloRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.send(sayHello('world loaded from /api/hello'));
}
