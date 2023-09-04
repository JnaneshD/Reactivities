# Reactivities - Your Activity Posting and Joining Web App

Reactivities is a web application that allows users to post activities happening around and join them. It's built with C# Web API on the backend and React on the frontend.

![Reactivities Screenshot](screenshots/screenshot.png)

## Features

- **Post Activities:** Users can create and post details about activities happening in their area or community.

- **Join Activities:** Users can browse and join activities posted by others that interest them.

- **User Authentication:** Secure user registration and login system to keep user data safe.

- **Real-time Updates:** Get real-time updates when activities are created or when other users join your activities.

## Technologies Used

- **Backend:**
  - C# Web API
  - Entity Framework Core for database management
  - SignalR for real-time updates

- **Frontend:**
  - React.js
  - Axios for making API requests
  - React Router for routing
  - Semantic UI for styling

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) - Make sure you have Node.js installed.
- [.NET SDK](https://dotnet.microsoft.com/download) - Ensure you have .NET SDK installed for the backend.
- [Visual Studio Code](https://code.visualstudio.com/) (recommended) or your preferred code editor.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/reactivities.git
   ```
   
2. Navigate to the frontend directory:
  
  ```bash
  cd reactivities-client
  ```
  
3. Install frontend dependencies:
   
  ```bash
  npm install
  ```
  
4. Navigate to the backend directory:

  ```bash
  cd ../API
  ```

5. Restore NuGet packages and apply migrations:
   
  ```bash
  dotnet restore
  dotnet ef database update
  ```

6. Start the backend:
   
  ```bash
  dotnet run
  ```

7. Start the frontend:
  ```bash
  cd ../client-app
  npm start
  ```
Open your browser and visit http://localhost:3000 to access the Reactivities app.
