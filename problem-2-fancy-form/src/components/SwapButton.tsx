import SwitchIcon from '../assets/switch-horizontal-01.svg';

interface Props {
  onClick: () => void;
  disabled: boolean;
}

export default function SwapButton({ onClick, disabled }: Props) {
  return (
    <button onClick={onClick} disabled={disabled} className='swap-button'>
      <img src={SwitchIcon} alt='Swap' className='switch-icon' />
    </button>
  );
}
