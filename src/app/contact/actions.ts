'use server';

import { z } from 'zod';
import { postToSheet } from '@/lib/sheet';

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  subject: z.string().max(160).optional().or(z.literal('')),
  message: z.string().min(5).max(2000),
});

export type ContactState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success' };

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = ContactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: 'error', message: 'Please add your name, a valid email and a message.' };
  }
  const c = parsed.data;

  const ok = await postToSheet({
    formType: 'contact',
    name: c.name,
    email: c.email,
    subject: c.subject || '',
    message: c.message,
  });

  if (!ok) {
    return {
      status: 'error',
      message: 'Could not send your message right now. Please email us directly.',
    };
  }

  return { status: 'success' };
}
