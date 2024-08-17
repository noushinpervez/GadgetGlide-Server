# GadgetGlide Server

## Overview

GadgetGlide Server is the backend for the GadgetGlide web application, built using Node.js, Express and MongoDB. It provides the API endpoints necessary for managing and fetching product data, implementing search, filtering, sorting and pagination functionalities.

## Features

- **Search**: Search for products by name, category or brand.
- **Filtering**: Filter products by category, brand and price range.
- **Sorting**: Sort products by price or date added.
- **Pagination**: Efficiently paginate through product listings.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [MongoDB](https://www.mongodb.com/) (Atlas or local instance)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/noushinpervez/GadgetGlide-Server.git
   cd GadgetGlide-Server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   DB_USER=<mongodb-username>
   DB_PASS=<mongodb-password>
   ```

4. **Run the server**
   
   ```bash
   node index.js
   ```
   
   **Or,**
   
   For development purposes, `nodemon` can be used to automatically restart the server on file changes:

   **Install `nodemon` and run the server**

   ```bash
   npm i nodemon
   ```

   ```bash
   nodemon index.js
   ```

   The server will start on `http://localhost:5000`.

## API Endpoints

### GET /products

Fetches a list of products with optional filters, sorting and pagination.

**Query Parameters:**

- `search`: Search term for product name, category or brand.
- `category`: Comma-separated list of categories to filter by.
- `brandName`: Comma-separated list of brands to filter by.
- `priceSort`: Sorting by price (`asc` for low to high, `desc` for high to low).
- `dateSort`: Sorting by creation date (`asc` for newest first, `desc` for oldest first).
- `page`: Page number for pagination (default is 1).
- `limit`: Number of products per page (default is 9).
- `minPrice`: Minimum price for filtering.
- `maxPrice`: Maximum price for filtering.

**Response:**

```json
{
  "products": [
    {
      "productName": "Product Name",
      "image": "URL to image",
      "description": "Product description",
      "price": 100.0,
      "category": "Category Name",
      "brandName": "Brand Name",
      "ratings": 4.5,
      "creationDateTime": "2024-08-17T00:00:00Z"
    }
  ],
  "totalPages": 5
}
```