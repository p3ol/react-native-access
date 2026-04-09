import { type TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  emit(event: string, data: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativePaywallModule',
);
