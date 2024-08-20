import type { UnPromisify } from '@ajabhijeet21-internal/ts-utils';
import type { SearchPoemsQuery } from './SearchPoemsQuery';

export interface SearchPoemsParams {
  limit?: number;
  offset?: number;
}

export type SearchPoems = UnPromisify<ReturnType<SearchPoemsQuery['execute']>>;
