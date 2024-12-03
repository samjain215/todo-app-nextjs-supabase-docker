import { render, fireEvent, screen, act } from '@testing-library/react';
import NewHome from '@/app/home/page';
import '@testing-library/jest-dom';

// Adjusted mock fetch to include a task with task_id '1'
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        profile: { username: 'Samyak Jain' },
        tasks: {
          UI: [
            {
              task_id: 1,
              user_id: 'c3978581-4ec1-4f63-9cb1-f2583d2f4b73',
              title: 'Initial Task Title',
              description: 'Initial Task Description',
              category_id: 1,
              priority_id: 3,
              due_date: '2024-12-29',
              status: 'Pending',
              created_at: '2024-11-29T01:25:12.764245+00:00',
              updated_at: null,
              completed: false,
            },
          ],
          NUI: [],
          UNI: [],
          NUNI: [],
        },
      }),
  })
);

const USER = {
  data: {
    user: {
      id: 'c3978581-4ec1-4f63-9cb1-f2583d2f4b73',
      // ... other user data
    },
  },
  error: null,
};

jest.mock('@supabase/auth-helpers-nextjs', () => {
  return {
    createClientComponentClient: jest.fn(() => ({
      auth: {
        getUser: jest.fn(() => Promise.resolve(USER)),
      },
    })),
  };
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('NewHome Component', () => {
  it('renders the home page and edits a task in Urgent & Important', async () => {
    // Render the component inside an act() block
    await act(async () => {
      render(<NewHome />);
    });

    // Verify the Eisenhower Matrix is present
    expect(screen.getByText(/Eisenhower Matrix/i)).toBeInTheDocument();

    // Verify the initial task is present
    expect(screen.getByText('Let's Go to Italy')).toBeInTheDocument();

    // Find the edit button for the task with task_id '1'
    // Assuming it has data-testid='edit-button-1'
    const editButton = screen.getByTestId(1);

    // Click the edit button
    await act(async () => {
      fireEvent.click(editButton);
    });

    // Verify the modal is opened
    expect(screen.getByText('Edit Task')).toBeInTheDocument();

    // Since the values are already there, we can change them
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Task Title'), {
        target: { value: 'Updated Task Title' },
      });
      fireEvent.change(screen.getByLabelText('Task Description'), {
        target: { value: 'Updated Task Description' },
      });
      fireEvent.change(screen.getByLabelText('Due Date'), {
        target: { value: '2024-12-31' },
      });
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });

    // Verify the modal is closed
    expect(screen.queryByText('Edit Task')).not.toBeInTheDocument();

    // Verify that the task shows the updated values
    expect(screen.getByText('Updated Task Title')).toBeInTheDocument();
  });
});
