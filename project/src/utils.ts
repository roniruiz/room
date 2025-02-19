import { Guest } from './types';

export const parseCSV = (content: string): Guest[] => {
  const lines = content.split('\n');
  // Skip header row and filter out empty lines
  return lines
    .slice(1)
    .filter(line => line.trim())
    .map(line => {
      const [name, rsvp] = line.split(',');
      return {
        id: crypto.randomUUID(),
        name: name.trim(),
        rsvp: (rsvp?.trim().toLowerCase() || 'pending') as Guest['rsvp'],
      };
    });
};

export const generateCSV = (guests: Guest[]): string => {
  const header = 'Nombre,RSVP\n';
  const rows = guests.map(guest => 
    `${guest.name},${guest.rsvp}`
  ).join('\n');
  return header + rows;
};

export const downloadCSV = (guests: Guest[]) => {
  const csv = generateCSV(guests);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `invitados-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};