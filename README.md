# Next.js Project Readme

## Overview
This is a sample Next.js project demonstrating a basic layout for a web application. The application includes a header component, client-side navigation, and authentication using local storage.

### Live Demo
You can access the live demo of this project [here](https://next-project-o44f.vercel.app/).

## Features
- **Header Component**: The application includes a header component that displays a company logo and user email.
- **Client-side Navigation**: It utilizes client-side navigation using the `useRouter` hook from Next.js to navigate between pages.
- **Authentication**: The application checks for a token in local storage. If no token is found, it redirects the user to the login page.

## Code Explanation

### `RootLayout` Component
- The `RootLayout` component is the main layout used across the application.
- It checks for the presence of a token in local storage. If no token is found, it redirects the user to the login page.
- The header includes the company logo on the left and the user's email on the right.
- The header is clickable, and when clicked, it navigates the user to the "/packages" page.

### Header Component
- The header component is a part of the `RootLayout` component.
- It displays the company logo and the user's email.
- The company logo is clickable, and when clicked, it navigates the user to the "/packages" page.
- It uses the `UserOutlined` icon from Ant Design for the user icon.

### Navigation
- Navigation is handled using the `useRouter` hook from Next.js.
- Clicking on the company logo or the header component triggers navigation to the "/packages" page.

### Authentication
- Authentication is implemented by checking for the presence of a token in local storage.
- If no token is found, the user is redirected to the "/login" page.

## Getting Started
To run this project locally:

1. Clone this repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development server.
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Technologies Used
- Next.js
- React
- Ant Design

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
