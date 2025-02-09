# Project 👯‍♀️ TwinAI: Social AI Twin Platform

## Overview

TwinAI is an innovative platform that allows users to create AI-powered digital alter egos (Twins) based on social media activity. These AI twins can interact with users and perform various tasks, including trading tokens and engaging with followers.

![Twin Demo](https://res.cloudinary.com/storagemanagementcontainer/image/upload/v1738080385/portfolio/twin-demo_xno51m.png)

## Set Up

```bash
pnpm install
pnpm run dev
```

Open a separate terminal and run the server:
```bash
pnpm run server
```

## Features

- **Create Your Twin**: Users can create a digital alter ego by registering their social media handle (e.g., Twitter/X). The platform verifies the handle's availability through the X API.

- **Twineet Generation**: The platform generates twineets based on any existing twitter account + chosen personality traits.
- **AI Learning**: Each Twin learns from the original account's social media activity, adapting its personality and responses based on historical data.

- **Personality Customization**: Users can define their Twin's personality traits, such as being aggressive or conservative, which influences its trading behavior and interactions.

- **Marketplace**: Once created, Twins can be listed for sale in the marketplace, allowing users to buy shares in these AI twins.

- **Verification System**: Twins can achieve verification status based on user investment, ensuring a level of trust in the AI's operations.

- **Cloning Feature**: Users can fuse Twins to create new AI twins with combined traits, allowing for unique personality blends.

- **Leaderboard**: The platform features a leaderboard to track the most valuable and active Twins, providing insights into engagement and market influence.

## Tech Stack

- **Frontend**: 
  - **React**: A JavaScript library for building user interfaces.
  - **Next.js**: A React framework for server-side rendering and static site generation.
  - **Tailwind CSS**: A utility-first CSS framework for styling.
  - **Lucide React**: A collection of icons for React applications.

- **Backend**:
  - **Node.js**: JavaScript runtime for building server-side applications.
  - **Express**: A web application framework for Node.js.
  - **EdgeDB**: A database designed for modern applications, providing a powerful query language and schema management.

- **APIs**:
  - **OpenAI API**: For generating content and responses based on user interactions.
  - **Twitter API**: For fetching tweets and user data.

- **State Management**:
  - **Zustand**: A small, fast state management solution for React.

- **Development Tools**:
  - **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
  - **ESLint**: A static code analysis tool for identifying problematic patterns in JavaScript code.
  - **Prettier**: An opinionated code formatter.

## Cron Jobs

The TwinAI platform utilizes cron jobs to automate various background tasks, ensuring that the application remains responsive and up-to-date. The primary cron job in this application is responsible for generating new Twineets for each Twin every 5 minutes. 

### Key Functions of the Cron Job:

- **Fetch New Tweets**: The cron job fetches the latest tweets from the associated Twitter handles of the Twins. This ensures that the Twineets generated are based on the most recent social media activity.

- **Generate Twineets**: After fetching the latest tweets, the cron job generates new Twineets using the OpenAI API. This allows the Twins to maintain an active and engaging presence on the platform.

- **Database Updates**: The generated Twineets are then inserted into the database, allowing users to view the latest content without needing to refresh the page.

- **Error Handling**: The cron job includes error handling to log any issues that arise during the fetching or generation process, ensuring that the application can recover gracefully.

## Pages

These are the main route handlers for the application.

| Path            | File                     | Description                                      |
|------------------|--------------------------|--------------------------------------------------|
| /                | page.tsx                 | Home page of the application.                    |
| /analytics       | analytics/page.tsx       | Analytics dashboard.                             |
| /clone           | clone/page.tsx           | Clone-related page (possibly for duplicating content). |
| /createtwin      | createtwin/page.tsx      | Page for creating a "twin" entity.              |
| /leaderboard     | leaderboard/page.tsx      | Displays rankings or scores.                     |
| /login           | login/page.tsx           | Login page.                                     |
| /marketplace     | marketplace/page.tsx      | Marketplace where users can trade or interact with assets. |
| /portfolio       | portfolio/page.tsx        | User's portfolio page.                          |
| /register        | register/page.tsx         | Registration page for new users.                |
| /timeline        | timeline/page.tsx         | User timeline, likely similar to a feed.       |

## API Routes

Backend endpoints responsible for handling data and API interactions.

| API Endpoint                              | File                                           | Description                                      |
|-------------------------------------------|----------------------------------------------|--------------------------------------------------|
| **General API Routes**                    |                                              |                                                  |
| `/api/generate`                           | `api/generate/route.ts`                      | Generates data (possibly AI-generated content). |
| `/api/tweets`                             | `api/tweets/route.ts`                        | Handles tweet-related API calls.                 |
|                                           |                                              |                                                  |
| **Twineet API Routes**                    |                                              |                                                  |
| `/api/twineets`                           | `api/twineets/route.ts`                      | Manages "twineets" (possibly retweets or clones). |
| `/api/twineets/:twineetId`                | `api/twineets/[twineetId]/route.ts`          | Specific twineet interactions.                   |
| `/api/twineets/:twineetId/isliked`        | `api/twineets/[twineetId]/isliked/route.ts`  | Checks if a twineet is liked.                    |
| `/api/twineets/:twineetId/isretwineeted`  | `api/twineets/[twineetId]/isretwineeted/route.ts` | Checks if a twineet is retweeted.               |
| `/api/twineets/:twineetId/replies`        | `api/twineets/[twineetId]/replies/route.ts`  | Fetches replies to a twineet.                    |
|                                           |                                              |                                                  |
| **Twin API Routes**                       |                                              |                                                  |
| `/api/twins`                              | `api/twins/route.ts`                         | Manages "twins" (cloned profiles or entities).   |
| `/api/twins/:twinId`                      | `api/twins/[twinId]/route.ts`                | Handles twin actions per twin.                   |
| `/api/twins/:twinId/buy`                  | `api/twins/[twinId]/buy/route.ts`            | Handles the purchase of twin shares.            |
| `/api/twins/:twinId/twineets`             | `api/twins/[twinId]/twineets/route.ts`       | Retrieves all twineets associated with a twin.  |
| `/api/twins/:twinId/twineets/:twineetId`  | `api/twins/[twinId]/twineets/[twineetId]/route.ts` | Fetches a specific twineet under a twin.   |
|                                           |                                              |                                                  |
| **User API Routes**                       |                                              |                                                  |
| `/api/users`                              | `api/users/route.ts`                         | General user management API.                     |
| `/api/users/:userId`                      | `api/users/[userId]/route.ts`                | Fetches a specific user's data.                  |
| `/api/users/:userId/balance`              | `api/users/[userId]/balance/route.tsx`       | Retrieves the balance of a user.                 |
| `/api/users/:userId/shares`               | `api/users/[userId]/shares/route.ts`         | Retrieves shares owned by a user.                |
| `/api/users/login`                        | `api/users/login/route.ts`                   | Handles user login.                              |
| `/api/users/logout`                       | `api/users/logout/route.ts`                  | Logs out the user.                               |
| `/api/users/register`                     | `api/users/register/route.ts`                | Handles new user registration.                   |


## Components

Reusable UI components used across the project.

| Component Name      | File                     | Description                                      |
|---------------------|--------------------------|--------------------------------------------------|
| Analytics            | Analytics.tsx            | Displays analytics data.                         |
| Navbar               | Navbar.tsx               | Navigation bar component.                        |
| NotificationBar      | NotificationBar.tsx      | Displays user notifications.                     |
| Portfolio            | Portfolio.tsx            | Manages and displays user portfolio.            |
| PriceChart           | PriceChart.tsx           | Displays price fluctuations.                     |
| SharePriceChart      | SharePriceChart.tsx      | Visualizes share prices.                         |
| ThemeToggle          | ThemeToggle.tsx          | Toggle for light/dark mode.                     |
| TokenStats           | TokenStats.tsx           | Displays statistics for tokens.                 |
| TradingChart         | TradingChart.tsx         | Chart displaying trading activity.               |

## Services

Handles API calls, database interactions, and external integrations.

| Service Name        | File                             | Description                                      |
|---------------------|----------------------------------|--------------------------------------------------|
| edgeDBService       | services/edgeDBService.ts        | Manages database interactions with EdgeDB.      |
| twitterService      | services/twitter.ts              | Handles Twitter-related API calls.               |

## State Management (Store)

Global state management for the application.

| Store Name          | File                             | Description                                      |
|---------------------|----------------------------------|--------------------------------------------------|
| marketplace          | store/marketplace.ts             | Manages state for the marketplace.               |
| themeStore           | store/themeStore.ts              | Handles theme toggling and settings.             |

## Utilities

Helper functions for data processing.

| Utility Name        | File                             | Description                                      |
|---------------------|----------------------------------|--------------------------------------------------|
| defaultData         | utils/defaultData.ts             | Provides default data sets.                      |
| formatData          | utils/formatData.ts              | Formats data for display.                        |
| twineetGenerator     | utils/twineetGenerator.ts        | Generates twineets dynamically.                  |

## Database Migrations

Manages database migrations.

| Schema Name         | File                             | Description                                      |
|---------------------|----------------------------------|--------------------------------------------------|
| default.esdl        | dbschema/default.esdl            | Defines EdgeDB schema.                          |
| edgeql-js           | dbschema/edgeql-js/              | EdgeQL JavaScript implementation.                |
| interfaces.ts       | dbschema/interfaces.ts            | Defines TypeScript interfaces for DB.           |

## Server-Side Code

Backend scripts for server-side logic.

| Script Name         | File                             | Description                                      |
|---------------------|----------------------------------|--------------------------------------------------|
| cron                | server/cron.ts                   | Handles scheduled tasks.                         |
| server index        | server/index.ts                  | Entry point for the server-side app.            |

## Tables and Schema

### 1. User
| Column Name      | Data Type     | Description                             |
|------------------|---------------|-----------------------------------------|
| userId           | UserIdType    | Unique identifier for the user         |
| username         | VARCHAR(255)  | User's chosen username                  |
| email            | VARCHAR(255)  | User's email address                    |
| passwordHash     | VARCHAR(255)  | Hashed password for authentication      |
| timestamp        | TIMESTAMP     | Timestamp of account creation           |
| birthday         | TIMESTAMP     | Optional user's birthday                |
| walletAddress     | VARCHAR(255)  | User's wallet address for transactions  |

### 2. Twin
| Column Name      | Data Type     | Description                             |
|------------------|---------------|-----------------------------------------|
| twinId           | TwinIdType    | Unique identifier for the Twin         |
| timestamp        | TIMESTAMP     | Timestamp of Twin creation              |
| userId           | UserIdType    | Reference to the User who created the Twin |
| twinHandle       | VARCHAR(255)  | Handle for the Twin                     |
| twitterHandle    | VARCHAR(255)  | Twitter handle associated with the Twin |
| profileImage     | VARCHAR(255)  | URL of the Twin's profile image        |
| personality      | VARCHAR(255)  | Personality traits of the Twin          |
| description      | TEXT          | Description of the Twin                 |
| autoReply        | BOOLEAN       | Indicates if the Twin should auto-reply |
| isListed         | BOOLEAN       | Indicates if the Twin is listed for sale |
| price            | DECIMAL       | Price of the Twin                       |
| stats            | TwinStats     | Link to TwinStats                       |
| verification     | Verification   | Link to Verification                    |
| analytics        | Analytics      | Link to Analytics                       |
| modelData        | JSON          | JSON data for the Twin's model         |
| twineets         | Twineet       | Multi-link to Twineet objects          |
| fetchedTweets     | FetchedTweet   | Multi-link to FetchedTweet objects      |
| tokenShares      | TokenShare    | Link to TokenShare                      |
| tokenStats       | TokenStats    | Link to TokenStats                      |
| transactions     | Transaction   | Multi-link to Transaction objects       |

### 3. Twineet
| Column Name      | Data Type     | Description                             |
|------------------|---------------|-----------------------------------------|
| twinId           | TwinIdType    | Reference to the Twin that created the Twineet |
| content          | TEXT          | Content of the Twineet                  |
| timestamp        | TIMESTAMP     | Timestamp of Twineet creation           |
| likes            | INT           | Number of likes on the Twineet          |
| retwineets       | INT           | Number of retwineets                    |
| replies          | INT           | Number of replies                        |
| isLiked          | BOOLEAN       | Indicates if the Twineet is liked       |
| isRetwineeted    | BOOLEAN       | Indicates if the Twineet is retweeted    |

### 4. FetchedTweet
| Column Name      | Data Type     | Description                             |
|------------------|---------------|-----------------------------------------|
| twinId           | TwinIdType    | Reference to the Twin that fetched the tweet |
| text             | TEXT          | Content of the fetched tweet            |
| edit_history_tweet_ids | ARRAY<STR> | Array of tweet IDs for edit history    |
| timestamp        | TIMESTAMP     | Timestamp of when the tweet was fetched |

### 5. TokenStats
| Column Name      | Data Type     | Description                             |
|------------------|---------------|-----------------------------------------|
| twinId           | TwinIdType    | Reference to the Twin                   |
| price            | DECIMAL       | Current price of the token              |
| change24h        | DECIMAL       | Price change in the last 24 hours      |
| volume24h        | INT           | Trading volume in the last 24 hours     |
| marketCap        | DECIMAL       | Market capitalization of the token      |

### 6. Transaction
| Column Name      | Data Type     | Description                             |
|------------------|---------------|-----------------------------------------|
| twinId           | TwinIdType    | Reference to the Twin involved in the transaction |
| kind             | TransactionGroup | Type of transaction (buy/sell)       |
| shares           | INT           | Number of shares involved in the transaction |
| pricePerShare    | DECIMAL       | Price per share at the time of transaction |
| totalAmount      | DECIMAL       | Total amount for the transaction       |
| timestamp        | TIMESTAMP     | Timestamp of the transaction           |

### 7. TokenShare
| Column Name      | Data Type     | Description                             |
|------------------|---------------|-----------------------------------------|
| twinId           | TwinIdType    | Reference to the Twin                   |
| totalShares      | INT           | Total shares available                  |
| availableShares   | INT           | Shares available for purchase           |
| pricePerShare    | DECIMAL       | Price per share                         |
| shareholders     | UserTokenShare | Multi-link to UserTokenShare objects    |

### 8. Analytics
| Column Name      | Data Type     | Description                             |
|------------------|---------------|-----------------------------------------|
| twinId           | TwinIdType    | Reference to the Twin                   |
| clickThroughRate | DECIMAL       | Click-through rate                      |
| engagementRate    | DECIMAL       | Engagement rate                        |
| impressions      | INT           | Number of impressions                   |
| cryptoHoldings    | CryptoHolding | Multi-link to CryptoHolding objects     |
| demographics     | Demographics  | Multi-link to Demographics objects      |
| dailyImpressions  | DailyImpressions | Multi-link to DailyImpressions objects |
| peakHours        | PeakHours     | Multi-link to PeakHours objects         |
| reachByPlatform   | ReachByPlatform | Multi-link to ReachByPlatform objects  |
| topInteractions   | TopInteractions | Multi-link to TopInteractions objects  |

### 9. User Table
| Column Name | Type | Constraints | Description |
|------------------|----------------|--------------------------------------|-----------------------------------------|
| userId | UserIdType (str) | Primary Key, Unique | Unique identifier for the user. |
| username | str | Unique, Required | User's chosen username. |
| email | str | Unique, Required | User's email address. |
| passwordHash | str | Required | Hashed password for authentication. |
| walletAddress | str | Required | Blockchain wallet address. |
| walletBalance | decimal | Default: 1,000,000 | User's token balance. |
| birthday | datetime | Optional | User's date of birth. |
| timestamp | datetime | Default: Now | Timestamp of account creation. |

### 10 User Relationships
| Relation | Type | Constraints | Description |
|------------------|----------------|--------------------------------------|-----------------------------------------|
| likes | multi link → Likes | Optional | Tweets liked by the user. |
| notifications | multi link → Notification | Optional | Notifications associated with the user. |
| replies | multi link → Replies | Optional | User's replies to tweets. |
| retwineets | multi link → Retwineets | Optional | User's retweets. |
| tokenShares | multi link → TokenShare | Optional | User's owned token shares. |
| tokenStats | multi link → TokenStats | Optional | Statistics related to user's token shares. |
| transactions | multi link → Transaction | Optional | Buy/sell transactions by the user. |
| twins | multi link → Twin | Optional | Twins created/owned by the user. |
| userTokenShares | multi link → UserTokenShare | Optional | User's share purchases in twins. |
## Project Structure

```
twin/
├── .git/
├── .next/
├── app/
│   ├── analytics/
│   │   └── page.tsx
│   ├── api/
│   │   ├── generate/
│   │   │   └── route.ts
│   │   ├── tweets/
│   │   │   ├── .DS_Store
│   │   │   └── route.ts
│   │   ├── twineets/
│   │   │   ├── [twineetId]/
│   │   │   │   ├── isliked/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── isretwineeted/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── replies/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── .DS_Store
│   │   │   │   └── route.ts
│   │   │   ├── .DS_Store
│   │   │   └── route.ts
│   │   ├── twins/
│   │   │   ├── [twinId]/
│   │   │   │   ├── buy/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── twineets/
│   │   │   │   │   ├── [twineetId]/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── .DS_Store
│   │   │   │   ├── .DS_Store
│   │   │   │   └── route.ts
│   │   │   ├── .DS_Store
│   │   │   └── route.ts
│   │   ├── users/
│   │   │   ├── [userId]/
│   │   │   │   ├── balance/
│   │   │   │   │   └── route.tsx
│   │   │   │   ├── shares/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── logout/
│   │   │   │   └── route.ts
│   │   │   ├── register/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── .DS_Store
│   ├── clone/
│   │   └── page.tsx
│   ├── components/
│   │   ├── Analytics.tsx
│   │   ├── Navbar.tsx
│   │   ├── NotificationBar.tsx
│   │   ├── Portfolio.tsx
│   │   ├── PriceChart.tsx
│   │   ├── SharePriceChart.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── TokenStats.tsx
│   │   ├── TradingChart.tsx
│   │   └── Wallet.tsx
│   ├── createtwin/
│   │   └── page.tsx
│   ├── leaderboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── marketplace/
│   │   └── page.tsx
│   ├── portfolio/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── services/
│   │   ├── edgeDBService.ts
│   │   └── twitter.ts
│   ├── store/
│   │   ├── marketplace.ts
│   │   └── themeStore.ts
│   ├── styles/
│   │   └── globals.css
│   ├── timeline/
│   │   └── page.tsx
│   ├── types/
│   │   ├── edgeql-js.d.ts
│   │   └── types.ts
│   ├── utils/
│   │   ├── defaultData.ts
│   │   ├── formatData.ts
│   │   └── twineetGenerator.ts
│   ├── .DS_Store
│   ├── index.css
│   ├── layout.tsx
│   └── page.tsx
├── dbschema/
│   ├── edgeql-js/
│   ├── migrations/
│   ├── .DS_Store
│   ├── default.esdl
│   ├── edgeql-js.d.ts
│   └── interfaces.ts
├── lib/
│   ├── auth.ts
│   ├── client.ts
│   └── queries.ts
├── node_modules/
├── server/
│   ├── cron.ts
│   └── index.ts
├── .DS_Store
├── .env
├── .eslintrc.js
├── .gitignore
├── edgedb.toml
├── edgeql-js.d.ts
├── next-env.d.ts
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.tsbuildinfo

```
## Conclusion

TwinAI aims to revolutionize the way users interact with social media through AI twins. By allowing users to create, customize, and trade these digital alter egos, TwinAI taps into the growing interest in AI and blockchain technology, creating a unique social platform for the future.

## Technical Considerations

- **Code Efficiency**: The current codebase is a work in progress, and its efficiency is yet to be fully assessed. A review of the code is necessary to identify areas for refactoring and optimization.

- **AI Integration**: Future development will focus on integrating advanced AI algorithms to enhance the Twins' capabilities, including their ability to generate meaningful content and trade effectively.

- **Blockchain Transactions**: The platform will implement blockchain technology to ensure transparency in transactions, with features like transaction hashes for tracking.

- **User Experience**: A global notification feed will keep users informed of market activity, enhancing engagement and interaction on the platform.

