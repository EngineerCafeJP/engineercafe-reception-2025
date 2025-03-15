import { format } from 'date-fns';

const formatTime = (timeString: string) => {
  const date = new Date(timeString);
  return format(date, 'HH:mm');
};

export default formatTime