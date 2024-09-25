import type { ReactNode } from 'react';

export interface NavLinkBase {
  name: string;
  kind: 'link' | 'group';
}

export interface NavLinkItem extends NavLinkBase {
  kind: 'link';
  href: string;
  current?: boolean;
  icon?: ReactNode;
  inNewTab?: boolean;
  key: string;
}

export interface NavLinkGroup extends NavLinkBase {
  kind: 'group';
  icon?: ReactNode;
  name: string;
  items: NavLinkItem[];
  key: string;
}

export type SitemapData = (NavLinkItem | NavLinkGroup)[];

export interface NavigationContextData {
  sitemap: SitemapData | null;
  accessiblePortals: AccessiblePortal[] | null;
}

export type AccessiblePortal = {
  key: string;
  name: string;
  icon: ReactNode;
};

export type LegacyLink = {
  name: string;
  href: string;
};
