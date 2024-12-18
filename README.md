# Property Frontend API
This is the frontend application for the Property Listing project, built with React and Next.js. It allows users to view a list of properties, search for a specific property by ID, and paginate through the listings.

## Features

- **Property Listing**: Displays a list of properties fetched from the backend.
- **Property Search**: Allows users to search for properties by their unique ID.
- **Responsive Layout**: The UI is designed to be responsive and works well on both desktop and mobile devices.
- **Pagination**: Fetches a specific set of properties per page for better UX.
- **Error Handling**: Handles errors when the API request fails or when an invalid ID is entered.

## Installation

1. Clone the repository:
   ```javascript
   git clone https://github.com/KingsIke/property_front.git
   cd property-frontend
   ```
2. Install dependencies:
```javascript
npm install
```

3. Run the development server:

```javascript
npm run dev
```
4. The frontend will be running on http://localhost:3000.

# Features in Detail
* Property Card Layout: Each property is displayed in a card format with information like the name, address, price, property type, and an image.
* Search by ID: A search bar allows users to input an ID and view a specific property's details.
* Pagination: The frontend fetches a paginated list of properties to improve the user experience.
* Responsive Design: The design adapts to both large screens and mobile devices using Tailwind CSS.
# Folder Structure
```javascript
property-frontend/
├── components/            # Reusable components (e.g., PropertyList)
├── pages/                 # Pages for the app (e.g., index.tsx)
├── public/                # Public assets (e.g., images)
├── styles/                # Global and component-specific styles
├── .gitignore             # Git ignore file
├── package.json           # Dependencies and scripts
└── README.md              # Project README
```

# Dependencies

* next: The React framework for server-side rendering and static site generation.
* react: The core React library.
* react-dom: React’s DOM rendering package.
* tailwindcss: A utility-first CSS framework for styling.
* fatch: Promise-based HTTP client for making API requests.

# License
This project is licensed under the MIT License - see the LICENSE file for details.
