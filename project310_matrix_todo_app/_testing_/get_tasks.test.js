import { createMocks } from "node-mocks-http"; // Utility to mock Next.js API request/response
import handler from "../pages/api/getTasks"; // Adjust the path to your API handler
import { supabase } from "../lib/initSupabase"; // Import Supabase as a named export

// Mock the Supabase client using a relative path
jest.mock("../lib/initSupabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe("GET /tasks", () => {
  it("Should return 200 and a list of tasks", async () => {
    // Mock the Supabase client chain
    const mockSelect = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockResolvedValue({
      status: 200,
      data: [
        { id: "1", title: "Test Task", created_at: "2023-11-15T12:00:00Z" },
      ],
      error: null,
    });

    supabase.from.mockReturnValue({
      select: mockSelect,
      eq: mockEq,
    });

    // Mock request and response objects with query parameter
    const { req, res } = createMocks({
      method: "GET",
      query: {
        password: "240403", // Add the necessary query parameter here
      },
    });

    // Call the API handler
    await handler(req, res);

    // Assertions
    expect(res._getStatusCode()).toBe(200); // Verify HTTP status code
    // expect(JSON.parse(res._getData())).toEqual({
    //   tasks: [
    //     { id: "1", title: "Test Task", created_at: "2023-11-15T12:00:00Z" },
    //   ],
    // }); // Verify response data
  });

  // it("Should return an error status and message when Supabase fails", async () => {
  //   // Mock Supabase's `from` method to return an error
  //   const mockSelect = jest.fn().mockReturnThis();
  //   const mockEq = jest.fn().mockResolvedValue({
  //     status: 500,
  //     data: null,
  //     error: { message: "Database error" },
  //   });

  //   supabase.from.mockReturnValue({
  //     select: mockSelect,
  //     eq: mockEq,
  //   });

  //   // Mock request and response objects with query parameter
  //   const { req, res } = createMocks({
  //     method: "GET",
  //     query: {
  //       userId: "123", // Add the necessary query parameter here
  //     },
  //   });

  //   // Call the API handler
  //   await handler(req, res);

  //   // Assertions
  //   expect(res._getStatusCode()).toBe(500); // Verify HTTP status code
  //   expect(JSON.parse(res._getData())).toEqual({
  //     error: "Database error",
  //   }); // Updated assertion
  // });
});
