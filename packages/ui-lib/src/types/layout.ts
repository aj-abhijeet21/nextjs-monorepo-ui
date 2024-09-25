import type { ReactNode } from 'react';

export interface WithChildren {
  children?: ReactNode;
}

export interface WithClassName {
  className?: string;
}

export type WithTitleOrLabel = {
  title?: string;
  label?: string;
};
