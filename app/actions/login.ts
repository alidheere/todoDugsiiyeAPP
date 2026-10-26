   

'use server';

export type FormState = {
  success: boolean;
  message: string;
  email: string;
  firstName: string;
  lastName: string;
};

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const firstName = String(formData.get('firstName') ?? '').trim();
  const lastName = String(formData.get('lastName') ?? '').trim();

  if (!email) {
    throw new Error('Email is required.');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  if (!firstName || !lastName) {
    throw new Error('First name and last name are required.');
  }

  console.log('Submitted email:', email);
}


