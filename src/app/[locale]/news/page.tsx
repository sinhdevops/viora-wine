import { getMessages } from 'next-intl/server';
import NewsPageContent from './_page-content';

export default async function NewsPage() {
  return <NewsPageContent />;
}
