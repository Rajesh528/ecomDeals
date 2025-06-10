 
🛍️ Angular E-Commerce Application
This is a responsive Angular e-commerce application with authentication (login/signup), product listing, editing, and state management using NgRx.

📦 Features
●🔐 User Authentication (Login / Signup)

●📃 View Products (Fetched from API)

●✏️ Edit / Update Products

●🗃️ State Management via NgRx

●💡 Error handling and loading states

●📱 Responsive design with Bootstrap


🚀 Getting Started
1. Clone the repository

git clone https://github.com/your-username/angular-ecommerce-app.git
cd angular-ecommerce-app

2. Install dependencies
Make sure you have Node.js and Angular CLI installed.
npm install


🛠️ Running the Application


ng serve

Visit the app at:
 📍 http://localhost:4200

🗃️ Project Structure
ruby
CopyEdit
src/
├── app/
│   ├── auth/               # Login & Signup
│   ├── products/           # Product components
│   ├── store/              # NgRx store (actions, reducers, effects, selectors)
│   ├── services/           # API interaction
│   ├── models/             # Interfaces for data types
│   └── app-routing.module.ts
│   └── app.module.ts


🔄 API Integration
Make sure the backend API is running or replace the API URL in environment.ts:

export const environment = {
  production: false,
  apiUrl: 'https://fakestoreapi.com' // Example: Change if needed
};


🔑 Authentication Details
Signup Fields:
●username

●mobile

●email

●password

●confirmPassword

Login credentials are stored in localStorage. A guard protects authenticated routes.

🧪 Testing
You can run tests using:
ng test

For end-to-end testing:
ng e2e


📦 Production Build

ng build --prod


📱 Responsiveness
●Built with Bootstrap 5 for mobile-first design

●Tested across multiple screen sizes


🧯 Error Handling
●API and form errors are handled globally via NgRx effects and service interceptors.

●Error messages are displayed using Bootstrap alerts.


🔐 Route Guards
●Unauthenticated users are redirected to login.

●Authenticated users are redirected from login/signup to home.


🔚 Logout
Logs out the user by clearing:
●localStorage

●NgRx auth state

