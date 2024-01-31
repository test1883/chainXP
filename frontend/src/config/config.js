import { http, createConfig } from 'wagmi'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'


const pegasus = {
    id: 1891,
    name: 'Pegasus',
    network: 'Lightlink Pegasus Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Lightlink',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://replicator.pegasus.lightlink.io/rpc/v1'] },
      default: { http: ['https://replicator.pegasus.lightlink.io/rpc/v1'] },
    },
    blockExplorers: {
      default: { name: 'Pegasus', url: 'https://pegasus.lightlink.io' },
      etherscan: { name: 'Pegasus', url: 'https://pegasus.lightlink.io' },
    },
    testnet: true,
  };

export const config = createConfig({
  chains: [pegasus],
  connectors: [
    injected(),
    walletConnect({ projectId: process.env.REACT_APP_PROJECT_ID }),
    metaMask(),
    safe(),
  ],
  transports: {
    [pegasus.id]: http('https://replicator.pegasus.lightlink.io/rpc/v1'),
  },
})