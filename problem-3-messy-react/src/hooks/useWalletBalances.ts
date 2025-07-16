import { useState } from 'react';
import type { WalletBalance } from '../types/wallet';

const useWalletBalances = (): WalletBalance[] => {
  const [balances] = useState<WalletBalance[]>([
    { currency: 'OSMO', amount: 50, blockchain: 'Osmosis' },
    { currency: 'ETH', amount: 1.5, blockchain: 'Ethereum' },
    { currency: 'ARB', amount: 100, blockchain: 'Arbitrum' },
    { currency: 'ZIL', amount: 200, blockchain: 'Zilliqa' },
    { currency: 'NEO', amount: 0, blockchain: 'Neo' },
  ]);

  return balances;
};

export default useWalletBalances;
