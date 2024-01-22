import { describe, it, expect } from 'vitest';
import { sendTestEmail } from '../utils/emailSender';

describe('Email Sender', () => {
    it('sendTestEmail should run without throwing an error', async () => {
      await expect(sendTestEmail()).resolves.not.toThrow();
    });
  });
