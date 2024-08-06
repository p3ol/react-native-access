import type { EventCallbackFunction } from './types';

export function fromNativeEvent<
  T extends EventCallbackFunction<any>
  > (cb: T): (event: any) => void {
  return (event: any) => {
    cb(event?.nativeEvent);
  }
}
