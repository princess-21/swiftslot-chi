


import { getTodayInLagos } from '../utils/timezone';

interface Props {
  value: string;
  onChange: (date: string) => void;
}

export default function DatePicker({ value, onChange }: Props) {
  const today = getTodayInLagos();
  
  return (
    <div className="space-y-2">
      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
        Select Date
      </label>
      <input
        type="date"
        id="date"
        value={value}
        min={today}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
      />
    </div>
  );
}