'use server';

export interface ContactState {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
}

export async function submitContactAction(
  prevState: ContactState | null,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const projectType = formData.get('projectType')?.toString().trim() || 'General';
  const message = formData.get('message')?.toString().trim();

  const errors: Record<string, string[]> = {};

  if (!name || name.length < 2) {
    errors.name = ['Name must be at least 2 characters.'];
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = ['Please provide a valid email address.'];
  }

  if (!message || message.length < 10) {
    errors.message = ['Message must be at least 10 characters long.'];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please resolve the highlighted errors.',
      errors
    };
  }

  // Simulate network/email delivery delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // In production, send via Resend, Sendgrid, or webhook
  console.log(`[Contact Submission] from ${name} (${email}) for [${projectType}]: ${message}`);

  return {
    success: true,
    message: `Thank you ${name}! Your inquiry for "${projectType}" has been received. Sayan will reply shortly.`
  };
}
