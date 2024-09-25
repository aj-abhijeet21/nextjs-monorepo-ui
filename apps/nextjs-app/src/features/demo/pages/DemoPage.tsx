import { sayHello } from '@ajabhijeet21-internal/core-lib';
import { AsyncMessage, Button, Message } from '@ajabhijeet21-internal/ui-lib';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import type { FC } from 'react';
import { DemoMuiBlock, Jumbotron, PoetryBlock } from '../blocks';
import { demoConfig } from '../demo.config';
import { Banner } from '@/components/banner/Banner';
import { MainLayout } from '@/layouts/main';

export const DemoPage: FC = () => {
  const { t } = useTranslation(demoConfig.i18nNamespaces);

  return (
    <>
      <NextSeo
        title={t('demo:page.title')}
        description="Web-app nextjs monorepo example, https://github.com/aj-abhijeet21/nextjs-monorepo-ui"
      />
      <MainLayout>
        <div className="flex h-screen flex-col items-center justify-center gap-8">
          <Jumbotron />
          <Button variant={'negative'} className="bg-red-600">
            Explore now
          </Button>
        </div>
      </MainLayout>
    </>
  );
};
