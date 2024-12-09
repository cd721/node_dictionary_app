# How to develop the application

1. Clone the repository.
2. In a terminal, navigate to the repository's top level directory 
3. Create a file called ```.env```. To that file, add the Merriam Webster Dictionary API Key in the following format (place the Key in the quotation marks):
    ```API_KEY=""```
4. Run "nodemon start" in the terminal. The development server will start. File changes will be detected automatically.

# How to use the application 
These instructions assume that the development server is running.

1. Navigate to localhost:3000 in the browser. The homepage will be visible.
2. Navigate to localhost:3000/```word``` to get the definition of a word. This route will work for any word in the Merriam Webster Dictionary. If you misspell the word, the application will provide suggestions.

# How to containerize the application
1. Make sure Docker Desktop is open
2. In your terminal, run ```docker build -t my-app .```
3. Then run ```docker run -p 3000:3000 my-app```
4. Navigate to the address to access the application
