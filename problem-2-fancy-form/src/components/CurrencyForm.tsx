import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CurrencySelect from './CurrencySelect';
import type { CurrencyOption } from './CurrencySelect';
import SwapButton from './SwapButton';
import getIconUrl from './utils';
import './styles.css';

interface PricesData {
  currency: string;
  price: number;
}

export default function CurrencyForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { amount: 1 },
    mode: 'onChange',
  });

  const amount = watch('amount');

  const [options, setOptions] = useState<CurrencyOption[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [fromCurrency, setFromCurrency] = useState<CurrencyOption | null>(null);
  const [toCurrency, setToCurrency] = useState<CurrencyOption | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://interview.switcheo.com/prices.json');
      const data: PricesData[] = await res.json();

      const uniqueCurrencies = Array.from(new Set(data.map((d) => d.currency)));

      const newOptions = uniqueCurrencies.map((currency) => ({
        value: currency,
        label: currency,
        icon: getIconUrl(currency),
      }));

      setOptions(newOptions);

      const latest: Record<string, number> = {};
      data.forEach((item) => {
        latest[item.currency] = item.price;
      });
      setPrices(latest);

      setFromCurrency(
        newOptions.find((o) => o.value === 'CAD') || newOptions[0]
      );
      setToCurrency(newOptions.find((o) => o.value === 'EUR') || newOptions[1]);
    };

    fetchData();
  }, []);

  let convertedAmount = '';
  const isValidAmount = Number(amount) > 0;

  if (
    isValidAmount &&
    fromCurrency &&
    toCurrency &&
    prices[fromCurrency.value] &&
    prices[toCurrency.value]
  ) {
    const base = Number(amount);
    const rate = prices[fromCurrency.value] / prices[toCurrency.value];
    convertedAmount = (base * rate).toFixed(2);
  } else {
    convertedAmount = '';
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className='flex flex-col currency-form-container'>
      <h1 className='text-start currency-form-heading'>Currency Swap</h1>
      <div className='flex flex-col items-start md-flex-row'>
        <div className='flex flex-col items-start'>
          <div className='input-title'>Amount</div>
          <div className='input-group flex items-center border'>
            <input
              {...register('amount', {
                required: 'Amount is required',
                min: {
                  value: 0,
                  message: 'Amount must be greater than zero',
                },
              })}
              type='number'
              placeholder='Amount'
              className='input w-full border-none focus:outline-none'
            />
            <CurrencySelect
              value={fromCurrency}
              onChange={setFromCurrency}
              options={options}
            />
          </div>
          {errors.amount && (
            <p className='currency-form-error'>{errors.amount.message}</p>
          )}
        </div>

        <SwapButton onClick={handleSwap} disabled={!!errors.amount} />

        <div className='flex flex-col items-start'>
          <div className='input-title'>Converted to</div>
          <div className='input-group flex items-center border rounded-2xl px-4 py-3'>
            <input
              disabled
              value={convertedAmount}
              className='input w-full border-none'
            />
            <CurrencySelect
              value={toCurrency}
              onChange={setToCurrency}
              options={options}
            />
          </div>
        </div>
      </div>
      {fromCurrency && toCurrency && isValidAmount && convertedAmount && (
        <p className='currency-form-summary'>
          {`${Number(amount).toLocaleString()} ${
            fromCurrency.value
          } = ${convertedAmount} ${toCurrency.value}`}
        </p>
      )}
    </div>
  );
}
