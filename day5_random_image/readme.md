# Random Image API

## Description

This project is a Node.js application that serves a Random Image API.

## Features

- **Random Image API**: Fetch a random image.

## Technologies Used

- Node.js
- Express.js
- Axios (for fetching images from third-party APIs)
- Base64 encoding for images
- HTML and JavaScript for the front-end

## API Endpoints

### 1. **Get a Random Image**

- **Endpoint**: `/api/images/random`
- **Method**: GET
- **Response**: A JSON object containing a base64-encoded string of a random image.

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
}
```

## Testing

You can test the API endpoints using Postman or by visiting `http://localhost:3000` in your browser to interact with the front-end.
