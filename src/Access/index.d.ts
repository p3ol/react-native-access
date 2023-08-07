import { View } from 'react-native';

export default class Access {
  instanciate(appId: string): Access;
  createPaywall(
    pageType?: string,
    view?: View,
    percent?: number,
    complete?: () => void,
  ): void;
  config(options: { [key: string]: any }, readOnly?: bool): Access;
}
