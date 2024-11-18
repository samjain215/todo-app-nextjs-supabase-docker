import { createMocks } from 'node-mocks-http'; // Utility to mock Next.js API request/response
import handler from '../pages/api/getTasks'; // Adjust the path to your API handler
import { supabase } from '../lib/initSupabase'; // Import Supabase as a named export

// Mock the Supabase client using a relative path
jest.mock('../lib/initSupabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe('GET /tasks', () => {
  it('Should return 200 and a list of tasks', async () => {
    supabase.from.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        status: 200,
        data: [{ id: '1', title: 'Test Task' }],
        error: null,
      }),
    });

    // Mock request and response objects
    const { req, res } = createMocks({
      method: 'GET',
    });

    // Call the API handler
    await handler(req, res);

    // Assertions
    expect(res._getStatusCode()).toBe(200); // Verify HTTP status code
    expect(JSON.parse(res._getData())).toEqual({
      tasks: [{ id: '1', title: 'Test Task' }],
    }); // Verify response data
  });

  it('Should return an error status and message when Supabase fails', async () => {
    // Mock Supabase's `from` method to return an error
    supabase.from.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        status: 500,
        data: null,
        error: { message: 'Database error' },
      }),
    });

    // Mock request and response objects
    const { req, res } = createMocks({
      method: 'GET',
    });

    // Call the API handler
    await handler(req, res);

    // Assertions
    expect(res._getStatusCode()).toBe(500); // Verify HTTP status code
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Database error',
    }); // Updated assertion
  });
});
