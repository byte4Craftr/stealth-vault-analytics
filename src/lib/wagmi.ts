import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';
import { config as envConfig } from '../config/env';

export const config = getDefaultConfig({
  appName: 'Stealth Vault Analytics',
  projectId: envConfig.walletConnectProjectId,
  chains: [sepolia, mainnet],
  ssr: false,
});
