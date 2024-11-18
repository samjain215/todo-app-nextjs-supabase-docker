import { createMocks } from 'node-mocks-http'; // Utility to mock Next.js API request/response
import handler from '../pages/api/tasks'; // The API route to be tested
import supabase from '../lib/supabaseClient'; // Mocked Supabase client

jest.mock('../lib/supabaseClient');

describe('GET /tasks', () => {
  beforeEach(() => {
    // Mock Supabase `from` method for fetching data
    supabase.from = jest.fn().mockImplementation(() => ({
      select: jest.fn().mockResolvedValue({ data: [{ id: '1', title: 'Test Task' }], error: null }),
    }));
  });

  it('Should return 200 and a list of tasks', async () => {
    // Mock request and response objects for a GET request
    const { req, res } = createMocks({ method: 'GET' });

    // Call the API handler
    await handler(req, res);

    // Assertions
    expect(res._getStatusCode()).toBe(200); // Check if the status code is 200
    const data = JSON.parse(res._getData());
    expect(data).toEqual([{ id: '1', title: 'Test Task' }]); // Ensure the response contains the expected task
  });
});
