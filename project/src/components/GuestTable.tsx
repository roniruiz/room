import React from 'react';
import { Guest } from '../types';

interface GuestTableProps {
  guests: Guest[];
}

export function GuestTable({ guests }: GuestTableProps) {
  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(guest => guest.rsvp === 'yes').length;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RSVP
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {guests.map((guest) => (
              <tr key={guest.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {guest.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    guest.rsvp === 'yes' 
                      ? 'bg-green-100 text-green-800'
                      : guest.rsvp === 'no'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {guest.rsvp === 'yes' ? 'Confirmado' : guest.rsvp === 'no' ? 'No Asiste' : 'Pendiente'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Total Invitados: {totalGuests} | Confirmados: {confirmedGuests}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}