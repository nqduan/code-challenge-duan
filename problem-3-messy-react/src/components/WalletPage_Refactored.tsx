import React, { useMemo } from 'react';
import WalletRow from './WalletRow.tsx';
import useWalletBalances from '../hooks/useWalletBalances.ts';
import usePrices from '../hooks/usePrices.ts';
import type { WalletBalance } from '../types/wallet';

const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100;
    case 'Ethereum':
      return 50;
    case 'Arbitrum':
      return 30;
    case 'Zilliqa':
      return 20;
    case 'Neo':
      return 20;
    default:
      return -99;
  }
};

const WalletPage_Refactored: React.FC = ({ ...rest }) => {
  const balances: WalletBalance[] = useWalletBalances();
  const prices = usePrices();

  // ✅ Use useMemo only when needed
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const priority = getPriority(balance.blockchain);
        return priority > -99 && balance.amount > 0; // 🧹 Clean logic: only positive amounts
      })
      .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));
  }, [balances]);

  return (
    <div {...rest}>
      {sortedBalances.map((balance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            key={balance.currency}
            amount={balance.amount}
            usdValue={usdValue}
          />
        );
      })}
    </div>
  );
};

export default WalletPage_Refactored;
