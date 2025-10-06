export const formatLagosTime = (isoString: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Lagos',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(isoString));
};

export const formatLagosDateTime = (isoString: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Lagos',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoString));
};

export const getTodayInLagos = (): string => {
  const now = new Date();
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Lagos',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
};
