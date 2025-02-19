export interface Guest {
  id: string;
  name: string;
  rsvp: 'yes' | 'no' | 'pending';
}

export interface GuestFormData {
  name: string;
  rsvp: 'yes' | 'no' | 'pending';
}