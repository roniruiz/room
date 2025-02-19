import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { GuestFormData } from '../types';

interface GuestFormProps {
  onSubmit: (guest: GuestFormData) => void;
}

export function GuestForm({ onSubmit }: GuestFormProps) {
  const [formData, setFormData] = useState<GuestFormData>({
    name: '',
    rsvp: 'pending',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      rsvp: 'pending',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Agregar Nuevo Invitado</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="rsvp" className="block text-sm font-medium text-gray-700">
            RSVP
          </label>
          <select
            id="rsvp"
            value={formData.rsvp}
            onChange={(e) => setFormData(prev => ({ ...prev, rsvp: e.target.value as Guest['rsvp'] }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="pending">Pendiente</option>
            <option value="yes">Confirmado</option>
            <option value="no">No Asiste</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <UserPlus className="h-5 w-5 mr-2" />
        Agregar Invitado
      </button>
    </form>
  );
}