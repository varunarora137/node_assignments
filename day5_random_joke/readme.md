# Random Jokes API

## Description

This project is a Node.js application that serves a Random Jokes API.

## Features

- **Random Jokes API**: Fetch a random joke from a predefined list of jokes.
- **Combined Jokes and Images API**: Fetch both a random joke and a random image in a single response.

## Technologies Used

- Node.js
- Express.js
- Axios (for fetching images from third-party APIs)
- Base64 encoding for images
- HTML and JavaScript for the front-end

## API Endpoints

### 1. **Get a Random Joke**

- **Endpoint**: `/api/jokes/random`
- **Method**: GET
- **Response**: A JSON object with a random joke.

```json
{
  "joke": "Why don't scientists trust atoms? Because they make up everything!"
}
```

### 2. **Get a Random Joke and Image**

- **Endpoint**: `/api/jokes-images/random`
- **Method**: GET
- **Response**: A JSON object with both a random joke and a base64-encoded image.

```json
{
  "joke": "Why don't scientists trust atoms? Because they make up everything!",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
}
```

## Testing

You can test the API endpoints using Postman or by visiting `http://localhost:3000` in your browser to interact with the front-end.
