1) Set up the virtual environment by running the command: env/Scripts/activate  in your terminal
2) Before starting up the servers, make sure that all the frameworks and libraries in requirements.txt are installed on your local machine. This can be done using
the command: pip install -r requirements.txt
3) Also make sure react-router-dom is also installed using the command: npm install react-router-dom  (All these dependencies will be only installed in the virtual
environment that has been set up and not on your local machine)
4) Use two terminals. 
5) In one terminal (ensure that you are in the correct directory), run the command: npm start.
6) In the other terminal (ensure that you are in the correct directory), run the command: uvicorn main:app --reload
7) The React app should get set up automatically and from there you can input data into the SQLite database however you'd like.

PS. Ensure you're running the web app on a browser that has CORS disabled, otherwise you won't be able to POST data to the database