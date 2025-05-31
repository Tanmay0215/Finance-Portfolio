# Financial Portfolio Tracker

## Description

A web application to help users track their financial investments and portfolio performance. Users can add various assets like stocks, bonds, and cryptocurrencies, view their current values, and analyze historical performance. The application also features an AI chatbot for portfolio insights and recommendations.

## Features

*   User registration and authentication
*   Add, edit, and delete financial assets
*   Real-time (or near real-time) price updates for assets
*   Portfolio overview with total value and performance metrics
*   Detailed cryptocurrency information and market data
*   Cryptocurrency price charts and historical data
*   AI-powered chatbot for portfolio analysis and financial advice
*   Dashboard with net worth, protocol allocation, and breakdown tables
*   Secure API endpoints for data management

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Frontend:** React.js, Tailwind CSS
*   **Authentication:** JWT (JSON Web Tokens)
*   **Database**: MongoDB
*   **Generative AI**: Gemini API

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Tanmay0215/Finance-Portfolio
    cd finance-portfolio
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Edit the .env.sample file to create a `.env` file
    
4.  **Run the application:**
    ```bash
    npm start
    ```
    Or for development with nodemon:
    ```bash
    npm run dev
    ```
    The application should be accessible at `http://localhost:3000`.

## Usage

1.  Navigate to the registration page to create a new account or log in if you already have one.
2.  Explore the dashboard to get an overview of your net worth and asset allocations.
3.  Navigate to the Crypto section to view market data and details for various cryptocurrencies.
4.  Manage your portfolio by adding, viewing, or updating your financial assets.
5.  Utilize the AI Chatbot (accessible via a chat button) to:
    *   Ask questions about your portfolio.
    *   Get insights into your investments.
    *   Receive financial recommendations and market overviews.
