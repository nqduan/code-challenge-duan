import { useState } from 'react';

interface PricesData {
  [currency: string]: number;
}

const usePrices = (): PricesData => {
  const [prices] = useState<PricesData>({
    OSMO: 0.8,
    ETH: 1800,
    ARB: 1.2,
    ZIL: 0.02,
    NEO: 8,
  });

  return prices;
};

export default usePrices;
