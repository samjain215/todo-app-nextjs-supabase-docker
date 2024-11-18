import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/addTask';
import { supabase } from '../lib/initSupabase'; // Import Supabase as a named export

jjest.mock('../lib/initSupabase', () => ({
    supabase: {
      from: jest.fn(),
    },
  }));

describe('GET /tasks?action=add', () => {
  beforeEach(() => {
    supabase.from = jest.fn().mockImplementation(() => ({
      insert: jest.fn().mockResolvedValue({
        data: { id: '1', title: 'Test Task', priority: 'High' },
        error: null,
      }),
    }));
  });

  it('Should add a task using query parameters', async () => {
    // Mock the HTTP request and response
    const { req, res } = createMocks({
      method: 'GET',
      headers: { Authorization: 'Bearer user1' }, // Simulate valid user
      query: { action: 'add', title: 'New Task', priority: 'High' }, // Task data as query parameters
    });

    // Call the API handler
    await handler(req, res);

    // Check the status code and response data
    expect(res._getStatusCode()).toBe(201); // Expect 201 Created
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('title', 'New Task'); // Verify task title
    expect(data).toHaveProperty('priority', 'High'); // Verify task priority
  });

  it('Should return 400 if required fields are missing', async () => {
    // Mock the HTTP request and response
    const { req, res } = createMocks({
      method: 'GET',
      headers: { Authorization: 'Bearer user1' }, // Simulate valid user
      query: { action: 'add', title: 'New Task' }, // Missing priority
    });

    // Call the API handler
    await handler(req, res);

    // Check the status code and error message
    expect(res._getStatusCode()).toBe(400); // Expect 400 Bad Request
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('error', 'Missing required fields: title or priority');
  });

  it('Should return 401 for an unauthorized user', async () => {
    // Mock the HTTP request and response
    const { req, res } = createMocks({
      method: 'GET',
      query: { action: 'add', title: 'New Task', priority: 'High' }, // Task data
    });

    // Call the API handler without Authorization header
    await handler(req, res);

    // Check the status code and error message
    expect(res._getStatusCode()).toBe(401); // Expect 401 Unauthorized
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('error', 'Unauthorized');
  });
});
