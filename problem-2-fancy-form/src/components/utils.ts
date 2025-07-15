const getIconUrl = (symbol: string) => {
  const exceptions: Record<string, string> = {
    STEVMOS: 'stEVMOS',
    RATOM: 'rATOM',
    STOSMO: 'stOSMO',
    STATOM: 'stATOM',
    STLUNA: 'stLUNA',
  };

  const finalSymbol = exceptions[symbol] || symbol;

  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${finalSymbol}.svg`;
};

export default getIconUrl;
