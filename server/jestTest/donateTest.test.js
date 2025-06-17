


// donateTest.test.js
import { jest } from '@jest/globals';




// 👇 Mock nodemailer before importing app
jest.unstable_mockModule('nodemailer', () => ({
  default: {
    createTransport: () => ({
      sendMail: jest.fn((mailOptions, callback) => {
        callback(null, { response: 'Mock email sent' });
      }),
      verify: jest.fn((callback) => callback(null, true)),
    }),
  },
}));





// 👇 now import things after mocking
import request from 'supertest';
import app from '../appTest.js';

describe('POST /donate-client', () => {
  it('should submit donation request successfully', async () => {
    const response = await request(app)
      .post('/donate/donate-client')
      .send({
        clientName: 'Test Donor',
        clientPhone: '1234-456-7890',
        clientEmail: 'donor@example.com',
        clientDonateType: 'Supplies',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Donation Request was Submitted Successfully.',
    });
  });
});