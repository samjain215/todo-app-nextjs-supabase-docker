import { render, fireEvent, screen, act } from '@testing-library/react';
import NewHome from '@/app/home-new/page';
import '@testing-library/jest-dom';

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        profile: { username: "Samyak Jain" },
        tasks: {
          UI: [
            {
              task_id: 12,
              user_id: 'c3978581-4ec1-4f63-9cb1-f2583d2f4b73',
              title: 'weed',
              description: 'smoke it ',
              category_id: 1,
              priority_id: 3,
              due_date: '29 Dec',
              status: 'Pending',
              created_at: '2024-11-29T01:25:12.764245+00:00',
              updated_at: null,
              completed: false,
            },
          ],
          NUI: [],
          UNI: [],
          NUNI: []
        },
      }),
  })
);

const USER = {
  "data": {
    "user": {
      "id": "c3978581-4ec1-4f63-9cb1-f2583d2f4b73",
      "aud": "authenticated",
      "role": "authenticated",
      "email": "sam.jain2122@gmail.com",
      "email_confirmed_at": "2024-11-26T02:01:04.576175Z",
      "phone": "",
      "confirmation_sent_at": "2024-11-26T02:00:38.992196Z",
      "confirmed_at": "2024-11-26T02:01:04.576175Z",
      "recovery_sent_at": "2024-12-01T23:36:57.621578Z",
      "last_sign_in_at": "2024-11-26T02:01:04.952076Z",
      "app_metadata": {
        "provider": "email",
        "providers": [
          "email"
        ]
      },
      "user_metadata": {
        "email": "sam.jain2122@gmail.com",
        "email_verified": false,
        "phone_verified": false,
        "sub": "c3978581-4ec1-4f63-9cb1-f2583d2f4b73"
      },
      "identities": [
        {
          "identity_id": "56a7e5ea-b2f9-4764-ab07-a1326d61bc17",
          "id": "c3978581-4ec1-4f63-9cb1-f2583d2f4b73",
          "user_id": "c3978581-4ec1-4f63-9cb1-f2583d2f4b73",
          "identity_data": {
            "email": "sam.jain2122@gmail.com",
            "email_verified": false,
            "phone_verified": false,
            "sub": "c3978581-4ec1-4f63-9cb1-f2583d2f4b73"
          },
          "provider": "email",
          "last_sign_in_at": "2024-11-26T02:00:38.986621Z",
          "created_at": "2024-11-26T02:00:38.986695Z",
          "updated_at": "2024-11-26T02:00:38.986695Z",
          "email": "sam.jain2122@gmail.com"
        }
      ],
      "created_at": "2024-11-26T02:00:38.98197Z",
      "updated_at": "2024-12-02T03:36:59.36258Z",
      "is_anonymous": false
    }
  },
  "error": null
}

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
  it('renders the home page and adds a task to Urgent & Important', async () => {
    // Render the component inside an act() block
    await act(async () => {
      render(<NewHome />);
    });

    // Verify the Eisenhower Matrix is present
    expect(screen.getByText(/Eisenhower Matrix/i)).toBeInTheDocument();

    // Open the modal
    const openModalButton = screen.getByTestId('UI_button_+');
    await act(async () => {
      fireEvent.click(openModalButton);
    });

    // Verify the modal is opened
    expect(screen.getByText('Add New Task')).toBeInTheDocument();

    // Fill the form
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Task Title'), {
        target: { value: 'Test Task' },
      });
      fireEvent.change(screen.getByLabelText('Task Description'), {
        target: { value: 'This is a test task' },
      });
      fireEvent.change(screen.getByLabelText('Due Date'), {
        target: { value: '2024-11-30' },
      });
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });

    // Verify the modal is closed
    expect(screen.queryByText('Add New Task')).not.toBeInTheDocument();

    // Verify the new task is added to the task list
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });
});