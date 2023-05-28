# RecipeSharing_FrontEnd
React Website with API Integration
This project is a recipe sharing website that allows users to share and discover recipes. The website retrieves recipe data from an API and displays it on the frontend. To run the project successfully, you need to set up the API server and configure the React project accordingly.

Prerequisites

To run this project, you need to have the following installed on your system:

    Node.js
  
    npm (Node Package Manager)
  
    Git (optional, for cloning the project repository)
  
    Getting Started
  
Follow the steps below to get started with the React website and API integration:


1. Clone the Repository
    If you have Git installed, you can clone the project repository using the following command:
    
      git clone https://github.com/your-username/react-website.git

    Alternatively, you can download the project as a ZIP archive from the repository's page on GitHub and extract it to a directory on your local machine.

2. Install Dependencies
    Navigate to the project directory in your terminal/command prompt and run the following command to install the necessary dependencies:
    
      npm install
  
    This command will read the package.json file and install all the required packages listed in the file.

3. Set Up the API Server
    Before running the React project, you need to start the API server. The API server is responsible for providing the data to the React website.
  
      Download the API server code from https://github.com/idejaferati/RecipeSharing.
  
    Follow the instructions provided in the API server's README file to set up and run the server.

4. Configure API Endpoint
    Once the API server is up and running, you need to configure the React project to connect to the API server.
    Open the src/constants.ts file in the project directory. Modify the API_ENDPOINT constant to match the URL where your API server is running. For example:
  
      export const API_PATH = 'https://localhost:7164/api/';
  
    Replace http://localhost:7146/api with the actual URL of your API server.
    Make the same change for each place where the frontend makes requests in the api

5. Start the React Project
    Now you're ready to start the React project. Run the following command in your terminal/command prompt:
  
      npm start
  
    This command will start the development server and automatically open the website in your default browser. If the browser doesn't open automatically, you can       manually navigate to http://localhost:3000 to view the React website.

