### Travel Budget App

A full-stack web application designed to help users budget their trips by providing recommendations for activities and meals based on their budget.

---

#### **Table of Contents**
1. [Description](#description)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Reference](#api-reference)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)
8. [License](#license)

---

### **Description**
This app helps users plan and budget their trips. It recommends activities and meals based on the user's budget to avoid overspending. The app allows users to create trips, add expenses, and receive personalized recommendations for their trip destinations.

---

### **Features**
- **User Authentication**: Secure sign-in using Firebase Authentication.
- **Create and Manage Trips**: Users can create trips, add expenses, and track spending.
- **Recommendations**: Personalized suggestions for activities and meals based on the user's budget using OpenAI and Google APIs.
- **Responsive Design**: Fully responsive frontend for smooth experience on any device.

---

### **Installation**

To get the project up and running locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Saniya1016/travel-budget-app.git
   cd travel-budget-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase credentials to your `.env.local` file:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     ```

4. Set up OpenAI:
   - Create an OpenAI account at [OpenAI](https://openai.com/).
   - Add your OpenAI API key to your `.env.local` file:
     ```
     OPENAI_API_KEY=your-openai-api-key
     ```

5. Run the app locally:
   ```bash
   npm run dev
   ```

Your app should now be running on [http://localhost:3000](http://localhost:3000).

---

### **Usage**
- Sign in with your account to create and manage trips.
- Add expenses and view recommendations based on your trip budget.
- Modify and track your expenses as you plan your trip.

---

### **API Reference**
- **GET /api/trips**: Fetch all trips for the authenticated user.
  - *Headers*: `Authorization: Bearer <user-token>`
  - *Response*: List of trips.

- **POST /api/trips**: Create a new trip.
  - *Body*:
    ```json
    {
      "destination": "Paris",
      "budget": 1000,
      "startDate": "2025-04-01",
      "endDate": "2025-04-10"
    }
    ```
  - *Response*: Success message with trip data.

---

### **Technologies Used**
- **Frontend**: Next.js, React
- **Backend**: Firebase Firestore, Firebase Authentication, OpenAI API, Google Places API
- **Deployment**: Vercel (for frontend), Firebase (for backend)

---

### **Contributing**
If you'd like to contribute to this project, feel free to fork the repo and submit a pull request. Please follow the steps below:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new pull request.

---

### **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
