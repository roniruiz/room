import React, { useState, useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { GuestForm } from './components/GuestForm';
import { GuestTable } from './components/GuestTable';
import { Guest, GuestFormData } from './types';
import { parseCSV, downloadCSV } from './utils';

function App() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const parsedGuests = parseCSV(content);
        setGuests(parsedGuests);
      };
      reader.readAsText(file);
    }
  };

  const handleAddGuest = (formData: GuestFormData) => {
    const newGuest: Guest = {
      id: crypto.randomUUID(),
      name: formData.name,
      rsvp: formData.rsvp,
    };
    setGuests(prev => [...prev, newGuest]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Lista de Invitados</h1>
          <p className="mt-2 text-gray-600">Gestiona la lista de invitados para tu fiesta</p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Upload className="h-5 w-5 mr-2" />
            Importar CSV
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".csv"
            className="hidden"
          />
          
          <button
            onClick={() => downloadCSV(guests)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="h-5 w-5 mr-2" />
            Exportar CSV
          </button>
        </div>

        <GuestForm onSubmit={handleAddGuest} />
        
        {guests.length > 0 ? (
          <GuestTable guests={guests} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay invitados en la lista. Agrega invitados o importa un archivo CSV para comenzar.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;