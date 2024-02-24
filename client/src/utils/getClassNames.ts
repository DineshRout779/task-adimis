export const getStatusClasses = (status: string) => {
  switch (status) {
    case 'todo':
      return 'bg-red-50 text-zinc-600';
    case 'pending':
      return 'bg-yellow-200 text-zinc-600';
    case 'completed':
      return 'bg-green-200 text-zinc-600';
    default:
      return 'bg-gray-200 text-zinc-600';
  }
};
