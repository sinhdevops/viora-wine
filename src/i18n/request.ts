import {getRequestConfig} from 'next-intl/server';
import messages from '../messages/vi.json';

export default getRequestConfig(async () => {
  return {
    locale: 'vi',
    messages,
  };
});
