import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import type { FC } from 'react';
import { CtaBlock, FeaturesBlock, HeroBlock } from '../blocks';
import { homeConfig } from '../home.config';
import { MainLayout } from '@/layouts/main';

export const HomePage: FC = () => {
  const { t } = useTranslation(homeConfig.i18nNamespaces);

  return (
    <>
      <NextSeo
        title={t('home:page.title')}
        description="See https://github.com/aj-abhijeet21/nextjs-monorepo-ui"
      />
      <MainLayout>
        {/* <Banner /> */}
        <HeroBlock />
        <FeaturesBlock />
        <CtaBlock />
      </MainLayout>
    </>
  );
};
