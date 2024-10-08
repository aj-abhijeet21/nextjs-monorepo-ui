import {
  isNonEmptyString,
  isParsableNumeric,
} from '@ajabhijeet21-internal/ts-utils';
import { test, expect } from '@playwright/test';

test('should call the getUser graphql endpoint', async ({ request }) => {
  const resp = await request.post('/api/graphql', {
    data: {
      query: `query { getUser(id: 1) { email, id } }`,
    },
  });
  await expect(resp).toBeOK();
  const headers = resp.headers();
  expect(headers['content-type']).toEqual('application/json; charset=utf-8');
  const json = (await resp.json()) as {
    data?: { getUser?: { id: string; email: string } };
  };
  const { id, email } = json?.data?.getUser ?? {};
  expect(isNonEmptyString(email)).toBeTruthy();
  expect(isParsableNumeric(id)).toBeTruthy();
});
