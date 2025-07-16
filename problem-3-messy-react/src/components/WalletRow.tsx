import React from 'react';

interface WalletRowProps {
  amount: number;
  usdValue: number;
}

const WalletRow: React.FC<WalletRowProps> = ({ usdValue, amount }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
      }}
    >
      <div>Amount: {amount.toFixed()}</div>
      <div>USD Value: ${usdValue.toFixed(2)}</div>
    </div>
  );
};

export default WalletRow;
