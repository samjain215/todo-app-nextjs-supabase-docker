import { render, fireEvent, screen, act } from '@testing-library/react';
import NewHome from '@/app/home/page';
import '@testing-library/jest-dom';

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: {
            "categories": [
              {
                "category_id": 1,
                "name": "Work"
              },
              {
                "category_id": 2,
                "name": "Personal"
              },
              {
                "category_id": 3,
                "name": "Health"
              },
              {
                "category_id": 4,
                "name": "Urgent"
              },
              {
                "category_id": 5,
                "name": "Education"
              },
              {
                "category_id": 6,
                "name": "Shopping"
              },
              {
                "category_id": 7,
                "name": "Fitness"
              },
              {
                "category_id": 8,
                "name": "Hobbies"
              },
              {
                "category_id": 9,
                "name": "Travel"
              },
              {
                "category_id": 10,
                "name": "Finance"
              },
              {
                "category_id": 11,
                "name": "Clients"
              }
            ]
          },
        profile: { username: "Samyak Jain" },
        tasks: {
          UI: [],
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

describe('NewHome Component Category Selector', () => {
    it('opens the category selector and selects a category', async () => {
      // Render the component inside an act() block
      await act(async () => {
        render(<NewHome />);
      });

      // Verify the Eisenhower Matrix is present
      expect(screen.getByText(/Eisenhower Matrix/i)).toBeInTheDocument();

      // Open the category selector
      const categorySelectorButton = screen.getByTestId('category-selector'); // Assuming there's a button like this to open selector
      await act(async () => {
        fireEvent.click(categorySelectorButton);
      });

      // Check if a list is displayed
      expect(screen.getByText('Hobbies')).toBeInTheDocument();
      expect(screen.getByText('Shopping')).toBeInTheDocument();

      // Select a category from the dropdown or list
      const categoryOption = screen.getByTestId(1); // Directly searching for the category option to click
      await act(async () => {
        fireEvent.click(categoryOption);
      });

      // Verify that the selected category is displayed in the button
      expect(categorySelectorButton).toHaveTextContent('Work'); // Make sure the category selector button displays the selected category
    });
  });
