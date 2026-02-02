'use server';

import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { signIn, signOut } from '@/lib/auth';

export async function register(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return { error: 'All fields are required' };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters' };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { error: 'Email already in use' };
  }

  const hashedPassword = await hash(password, 12);

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return { success: true };
}

export async function loginWithCredentials(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return { error: 'Invalid email or password' };
    }
    throw error;
  }
}

export async function loginWithGoogle() {
  await signIn('google', { redirectTo: '/dashboard' });
}

export async function loginWithGitHub() {
  await signIn('github', { redirectTo: '/dashboard' });
}

export async function logout() {
  await signOut({ redirectTo: '/' });
}
