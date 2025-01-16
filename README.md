# OrdinalBots Assessment

This is a **Next.js** application built with **TypeScript** that leverages the **OrdinalsBot API** and **Blockchain** to display Bitcoin-related data, user-specific order details, and BRC-20 token balances. The app also supports wallet integration for a personalized experience.

## Key Features

- **Dynamic Order Details:**
  View comprehensive details for specific orders on the `/orders` route.
- **BRC-20 Token Balances:**
  Fetch and display balances for BRC-20 tokens on the `/balance` route.
- **Real-Time BTC Data:**
  Display the current Bitcoin price and block height.
- **Wallet Integration:**
  Seamlessly connect wallets using context, ensuring consistency throughout the app.

- **React Query for Data Fetching:**
  Efficient API interaction with caching and state management.

## Project Setup

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone <repo-url>
cd ordinalbots-assessment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the `.env.example` file and create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill in the following variables in your `.env` file:

```env
ORDINALSBOT_API_URL=your_ordinalsbot_api_url
ORDINALSBOT_API_KEY=your_ordinalsbot_api_key
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Application Structure

### API Routes

1. **BRC-20 Balance API**

   - **Endpoint:** `/api/brc20balance`
   - **Method:** `GET`
   - **Query Parameters:**
     - `address` (required): Wallet address to fetch the balance.
     - `ticker` (required): BRC-20 ticker.

2. **BTC Block Height API**

   - **Endpoint:** `/api/brc20balance/btcHeight`
   - **Method:** `GET`

3. **BTC Price API**

   - **Endpoint:** `/api/btcPrice`
   - **Method:** `GET`

4. **Order Details API**
   - **Endpoint:** `/api/order/[id]`
   - **Method:** `GET`
   - **Path Parameters:**
     - `id` (required): Order ID to fetch details.

### Frontend Routes

1. **`/`:**  
   Displays wallet status and Bitcoin height, Price data.

2. **`/orders`:**  
   Displays user-specific order details.

3. **`/balance`:**  
   Displays wallet balances and BRC-20 token details.

### Additional Features

- **Global Wallet Context:**  
  Ensures the same wallet is accessible across the entire app.

- **React Query Integration:**  
  Simplifies API data fetching, caching, and synchronization.

## Technologies Used

- **Frontend:** Next.js, TypeScript, React Context
- **API:** Axios, OrdinalsBot API, Coingecko
- **State Management:** React Query
- **Environment Configuration:** `.env` for managing sensitive keys.

## Future Improvements

- Add tests for API endpoints and frontend components.
- Improve UI/UX with responsive design and animations.
- Integrate additional blockchain APIs for enhanced functionality.
