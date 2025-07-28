# BlogApp

Welcome to BlogApp! This is a full-stack blog application featuring a .NET 8 Web API backend (using Entity Framework Core) and a modern React frontend. This guide will help you get both parts running smoothly on your machine.

---

## Project Structure

```
blogapp/
  backend/    # .NET 8 Web API (BlogService)
  frontend/   # React app
  README.md   # Project documentation
  .gitignore  # Git ignore file
```

---

## Getting Started

### Backend Setup 

#### Prerequisites
- .NET 8 SDK (https://dotnet.microsoft.com/download/dotnet/8.0)
- SQL Server Express or LocalDB (configured in `appsettings.json`)

#### 1. Install Dependencies

cd backend
 dotnet restore


#### 2. Apply EF Core Migrations
If this is your first time running the project, set up the database with:

dotnet ef database update

 If you don't have the EF Core CLI tools, install them with:

 dotnet tool install --global dotnet-ef


#### 3. Run the Backend

dotnet run

The API should now be running at `http://localhost:3001` (or as set in `launchSettings.json`).

---

### Frontend Setup

## Prerequisites
- Node.js(https://nodejs.org/) (v18+ recommended)
- npm (comes with Node.js)

#### 1. Install Dependencies

cd frontend
npm install


#### 2. Start the React App

npm start

The React app will be available at `http://localhost:3000`.

---

## Connecting Frontend and Backend
- The React app (frontend) talks to the API at `http://localhost:3001`.
- CORS is enabled in the backend to allow requests from `http://localhost:3000`.






#
