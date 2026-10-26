
'use server';

import { redirect } from 'next/navigation';

export async function searchTodosAction(formData: FormData) {
  const queryValue = formData.get('q');
  const statusValue = formData.get('status');

  const q =
    typeof queryValue === 'string' ? queryValue.trim() : '';

  const allowedStatuses = ['all', 'completed', 'pending'];
  const status =
    typeof statusValue === 'string' &&
    allowedStatuses.includes(statusValue)
      ? statusValue
      : 'all';

  const params = new URLSearchParams();

  if (q) {
    params.set('q', q);
  }

  if (status !== 'all') {
    params.set('status', status);
  }

  const queryString = params.toString();
  redirect(queryString ? `/?${queryString}` : '/');
}
