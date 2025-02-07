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

| API Endpoint                          | File                             | Description                                      |
|---------------------------------------|----------------------------------|--------------------------------------------------|
| /api/generate                         | api/generate/route.ts           | Generates data (possibly AI-generated content). |
| /api/tweets                           | api/tweets/route.ts             | Handles tweet-related API calls.                 |
| /api/twineets                         | api/twineets/route.ts           | Manages "twineets" (possibly retweets or clones). |
| /api/twineets/:twineetId             | api/twineets/[twineetId]/route.ts | Specific twineet interactions.                   |
| /api/twineets/:twineetId/isliked     | api/twineets/[twineetId]/isliked/route.ts | Checks if a twineet is liked.                   |
| /api/twineets/:twineetId/isretwineeted| api/twineets/[twineetId]/isretwineeted/route.ts | Checks if a twineet is retweeted.                |
| /api/twineets/:twineetId/replies     | api/twineets/[twineetId]/replies/route.ts | Fetches replies to a twineet.                   |
| /api/twins                            | api/twins/route.ts              | Manages "twins" (cloned profiles or entities).  |
| /api/twins/:agentId                  | api/twins/[agentId]/route.ts    | Handles twin actions per agent.                  |
| /api/twins/:agentId/twineets/:twineetId | api/twins/[agentId]/twineets/[twineetId]/route.ts | Manages twineets of a twin.                      |
| /api/users                            | api/users/route.ts              | General user management API.                     |
| /api/users/:userId                   | api/users/[userId]/route.ts     | Fetches a specific user's data.                  |
| /api/users/login                      | api/users/login/route.ts        | Handles user login.                              |
| /api/users/logout                     | api/users/logout/route.ts       | Logs out the user.                              |
| /api/users/register                   | api/users/register/route.ts     | Handles new user registration.                   |

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
| createdAt        | TIMESTAMP     | Timestamp of account creation           |
| birthday         | TIMESTAMP     | Optional user's birthday                |
| walletAddress     | VARCHAR(255)  | User's wallet address for transactions  |

### 2. Twin
| Column Name      | Data Type     | Description                             |
|------------------|---------------|-----------------------------------------|
| twinId           | TwinIdType    | Unique identifier for the Twin         |
| createdAt        | TIMESTAMP     | Timestamp of Twin creation              |
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

## Project Structure

```
twin/
├── .git/
├── .next/
│   ├── cache/
│   │   ├── eslint/
│   │   │   └── .cache_1o25e43
│   │   ├── swc/
│   │   │   └── plugins/
│   │   │   │   └── v7_macos_aarch64_4.0.0/
│   │   ├── webpack/
│   │   ├── .rscinfo
│   │   └── .tsbuildinfo
│   ├── server/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   ├── generate/
│   │   │   │   │   └── route.js
│   │   │   │   ├── tweets/
│   │   │   │   │   └── route.js
│   │   │   │   ├── twineets/
│   │   │   │   │   └── route.js
│   │   │   │   └── twins/
│   │   │   │   │   └── route.js
│   │   │   ├── createtwin/
│   │   │   │   └── page.js
│   │   │   ├── timeline/
│   │   │   │   └── page.js
│   │   │   └── page.js
│   │   └── webpack-runtime.js
│   ├── static/
│   ├── types/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   ├── generate/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── tweets/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── twineets/
│   │   │   │   │   └── route.ts
│   │   │   │   └── twins/
│   │   │   │   │   └── route.ts
│   │   │   ├── createtwin/
│   │   │   │   └── page.ts
│   │   │   ├── timeline/
│   │   │   │   └── page.ts
│   │   │   ├── layout.ts
│   │   │   └── page.ts
│   │   ├── cache-life.d.ts
│   │   └── package.json
│   ├── app-build-manifest.json
│   ├── build-manifest.json
│   ├── package.json
│   ├── react-loadable-manifest.json
│   └── trace
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
│   │   │   ├── [agentId]/
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
│   │   └── TradingChart.tsx
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

# BRKT READ ME

# Project Overview

## What is BRKT?
BRKT is an online platform that facilitates competitive gaming, prediction markets, and betting competitions. It integrates blockchain technology to provide a transparent, trustless betting experience.

(BRKT WEBSITE)[https://www.brkt.gg]

## How It Works

### Users Participate in Competitions
- Users can join competitions by placing bets using cryptocurrency.
- Custom competitions allow users to create and manage their own events.

### Blockchain Integration
- The platform uses Ethereum & Aptos blockchains for transparency.
- Ethers.js interacts with smart contracts for bet placements.
- Gas fees are managed via gas limits in competitions.

### Prediction Markets
- Users make periodic predictions on various topics (e.g., Bitcoin price, elections).
- Aggregated prediction data is stored to track accuracy over time.

### Raffles & Leaderboards
- Raffles allow users to buy tickets and win prizes.
- The leaderboard tracks top users based on betting success.

### Smart Contract Features
- Betting is trustless using smart contracts.
- Prize pools are distributed automatically based on results.

### Web3 User Interaction
- Users connect wallets (e.g., MetaMask).
- Betting and payments occur in crypto (ETH, USDC, etc.).

# Tech Stack
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Firebase Firestore (NoSQL)
- **Blockchain**: Ethers.js, Aptos SDK
- **Networking**: GraphQL, Axios

# Key Features
- ✔ Blockchain-Powered Competitions
- ✔ Decentralized Betting & Predictions
- ✔ Smart Contract-Based Prize Pool Distribution
- ✔ Customizable Competitions & Events
- ✔ Periodic & Aggregated Prediction Tracking


# Setup Instructions

## Install Dependencies
```bash
yarn install --legacy-peer-deps
```

## Run Locally
```bash
yarn run dev
```

## Deploy to Firebase
```bash
firebase login
firebase deploy
```
## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Framer Motion**: A library for creating animations in React.

#### Backend
- **Express**: A minimal and flexible Node.js web application framework.
- **Firebase**: A platform developed by Google for creating mobile and web applications.

#### Networking
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **GraphQL**: A query language for your API, and a server-side runtime for executing queries.

#### Blockchain
- **Ethers**: A library for interacting with the Ethereum blockchain and its ecosystem.
- **Aptos**: A library for interacting with the Aptos blockchain.

#### UI Libraries
- **@mui/material**: A popular React UI framework.
- **@emotion/react** & **@emotion/styled**: Libraries for writing CSS styles with JavaScript.
- **@nextui-org/react**: A modern and beautiful React UI library.
- **@radix-ui/react-components**: A set of unstyled, accessible UI primitives for React.

#### Development Tools
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins.
- **Autoprefixer**: A PostCSS plugin to parse CSS and add vendor prefixes.

#### Additional Libraries
- **Zustand**: A small, fast, and scalable state-management solution.
- **React Query**: A library for fetching, caching, and updating asynchronous data in React.
- **React Beautiful DnD**: A library for beautiful and accessible drag and drop for lists.
- **React Router**: A collection of navigational components for React applications.

Join the excitement and participate in various competitions and events to earn rewards and engage with the community.

# Pages

These are the main route handlers for the application.

| Path                                   | File                                      | Description                                      |
|----------------------------------------|-------------------------------------------|--------------------------------------------------|
| /                                      | app/layout.tsx                           | Layout file for the main app structure.          |
| /competitions                          | app/competitions/page.tsx                | Displays all competitions.                        |
| /CompetitionBracket/:id                | app/CompetitionBracket/[competitionId]/page.tsx | Bracket view of a specific competition.          |
| /CreateCompetition                     | app/CreateCompetition/page.tsx           | Page for creating a new competition.             |
| /leaderboard                           | app/leaderboard/page.tsx                 | Displays rankings or leaderboard.                |
| /profile                               | app/profile/page.tsx                     | User profile page.                               |
| /profile/bets                          | app/profile/ProfileBets.tsx              | User's betting history.                          |
| /profile/details                       | app/profile/ProfileDetails.tsx           | Profile details of the user.                     |
| /profile/avatar-upload                 | app/profile/AvatarUpload.tsx             | Profile avatar upload.                           |
| /profile/referral-code                | app/profile/ReferralCodeGen.tsx          | Generates a referral code for the user.         |
| /event/:id                             | app/event/[id]/page.tsx                  | Detailed event view.                            |
| /events                                | app/events/page.tsx                      | Events listing page.                             |
| /raffle/:id                            | app/Raffle/[id]/page.tsx                | Specific raffle page.                            |
| /rewards                               | app/Rewards/page.tsx                     | Displays user rewards.                           |

# API Routes

Backend endpoints responsible for handling data and API interactions.

| API Endpoint                          | File                                      | Description                                      |
|---------------------------------------|-------------------------------------------|--------------------------------------------------|
| /api/bets/:walletAddress              | app/api/bets/[walletAddress]/route.ts    | Retrieves bets associated with a wallet.        |
| /api/bitget/1/:walletAddress          | app/api/bitget/1/[walletAddress]/route.ts| Fetches bitget transactions for wallet (type 1).|
| /api/bitget/3/:walletAddress          | app/api/bitget/3/[walletAddress]/route.ts| Fetches bitget transactions for wallet (type 3).|
| /api/bitget/5/:walletAddress          | app/api/bitget/5/[walletAddress]/route.ts| Fetches bitget transactions for wallet (type 5).|
| /api/utility                          | app/api/utility.ts                        | Utility functions for API interactions.         |
| /api/profile-redirect                 | app/api/profile-redirect.ts               | Redirect handler for user profiles.             |

# Components

Reusable UI components used across the project.

| Component Name                        | File                                      | Description                                      |
|---------------------------------------|-------------------------------------------|--------------------------------------------------|
| BracketPreview                        | BracketPreview.tsx                        | Displays a preview of the tournament bracket.   |
| Card                                  | Card.tsx                                  | General-purpose card UI component.               |
| CompetitionCard                       | CompetitionCard.tsx                       | Displays details of a competition.               |
| CompetitionPage                       | CompetitionPage.tsx                       | Page layout for a competition.                   |
| CompetitionSlider                     | CompetitionSlider.tsx                     | Displays a slider for competitions.              |
| CreateBracket                         | CreateBracket.tsx                         | UI for creating brackets.                        |
| CreateRaffle                          | CreateRaffle.tsx                          | UI for creating a raffle event.                 |
| DollarInputBox                        | DollarInputBox.tsx                        | Input box for entering dollar amounts.           |
| EntryPage                             | EntryPage.tsx                             | UI for event entry.                             |
| Event                                 | Event.tsx                                 | Handles event-specific interactions.             |
| EventCard                             | EventCard.tsx                             | Displays an event card.                          |
| EventsComponent                       | EventsComponent.tsx                       | Main component for handling events.              |
| EventsPage                            | EventsPage.tsx                            | Page displaying events.                          |
| Footer                                | Footer.tsx                                | Footer component.                                |
| GridViewComponent                     | GridViewComponent.tsx                     | Grid display component.                           |
| IPTracker                             | IPTracker.tsx                             | Tracks user IP addresses.                        |
| Leaderboard                           | Leaderboard.tsx                           | Leaderboard component.                           |
| LottiePlayer                          | LottiePlayer.tsx                          | Displays Lottie animations.                      |
| MarketInfoModal                       | MarketInfoModal.tsx                       | Market information modal.                        |
| Modal                                 | Modal.tsx                                 | Generic modal component.                         |
| ModalContent                          | ModalContent.tsx                          | Content wrapper for modals.                     |
| Navbar                                | Navbar.tsx                                | Navigation bar component.                        |
| Quantitypicker                        | Quantitypicker.tsx                        | Quantity selection component.                    |
| RaffleComponent                       | RaffleComponent.tsx                       | Handles raffle UI.                              |
| RichTextEditor                        | RichTextEditor.tsx                        | WYSIWYG text editor.                            |
| TableComponentlp                      | TableComponentlp.tsx                      | Table component for leaderboard pages.          |
| TableSection                          | TableSection.tsx                          | Generic table section.                          |
| Web3Provider                          | Web3Provider.tsx                          | Web3 provider for blockchain integration.       |
| WheelComponent                        | WheelComponent.tsx                        | Displays a spinning wheel for raffles.         |

# State Management (Context)

Global state management for the application.

| Context Name                          | File                                      | Description                                      |
|---------------------------------------|-------------------------------------------|--------------------------------------------------|
| Wallet Context                        | contexts/WalletContext.tsx                | Manages wallet connection state.                 |

# Utilities

Helper functions for data processing.

| Utility Name                          | File                                      | Description                                      |
|---------------------------------------|-------------------------------------------|--------------------------------------------------|
| addNotification                       | utils/addNotification.ts                  | Handles notifications.                           |
| openGraphImageResponse                | utils/openGraphImageResponse.tsx          | Generates Open Graph image responses.            |
| ActivityTracker                       | CompetitionBracket/[competitionId]/utils/ActivityTracker.ts | Tracks user activity.                           |
| betPriceHistoryData                  | CompetitionBracket/[competitionId]/utils/betPriceHistoryData.ts | Stores betting history.                          |
| EstimatedPayout                       | CompetitionBracket/[competitionId]/utils/EstimatedPayout.tsx | Calculates estimated payout.                     |


# Database Schema

The data structure provided suggests a Firebase Firestore NoSQL schema, where collections and documents store various data points. Below is the schema translated into relational database tables (for SQL-based databases) while maintaining Firestore's document-oriented structure.

## Tables and Schema

### 1. activities (User Activities)
| Column Name      | Data Type     | Description                             |
|------------------|---------------|-----------------------------------------|
| activity_id      | VARCHAR(255)  | Unique ID for the activity              |
| result           | FLOAT         | Outcome of the activity                 |
| avatar_url       | TEXT          | User profile image URL                  |
| username         | VARCHAR(255)  | Username of the user                    |
| timestamp        | TIMESTAMP     | Time of the activity                    |

### 2. aggregatedPeriodicPredictions
| Column Name      | Data Type     | Description                             |
|------------------|---------------|-----------------------------------------|
| id               | VARCHAR(255)  | Unique identifier                       |
| aggregatedStats   | JSON          | Aggregated statistics for predictions    |

### 3. aggregatedPredictions (Prediction Rounds)
| Column Name      | Data Type     | Description                             |
|------------------|---------------|-----------------------------------------|
| prediction_id    | VARCHAR(255)  | Unique ID for prediction                |
| round_0          | JSON          | Data for round 0                        |
| round_1          | JSON          | Data for round 1 (optional)            |
| round_2          | JSON          | Data for round 2 (optional)            |
| round_3          | JSON          | Data for round 3 (optional)            |

### 4. catSocietyWhitelist
| Column Name      | Data Type     | Description                             |
|------------------|---------------|-----------------------------------------|
| id               | VARCHAR(255)  | Unique ID for user                      |
| guaranteed       | BOOLEAN       | Whether the user is guaranteed access   |

### 5. competitions (Main Competitions)
| Column Name                | Data Type     | Description                             |
|----------------------------|---------------|-----------------------------------------|
| competition_id             | VARCHAR(255)  | Unique identifier for the competition   |
| game_type                  | VARCHAR(100)  | Type of game (e.g., sports, stocks)    |
| competition_title          | VARCHAR(255)  | Title of the competition                 |
| team_names                 | JSON          | List of participating teams              |
| total_points_per_round     | INT           | Points per round                         |
| team_count                 | INT           | Number of teams                          |
| starting_epoch             | INT           | Start timestamp (epoch format)          |
| gas_limit                  | BIGINT        | Gas limit for blockchain transactions    |
| competition_background      | TEXT          | Description of the competition           |
| expiration_epoch           | INT           | Expiration timestamp                     |
| image_url                  | TEXT          | Image representing the competition       |
| bracket_id                 | VARCHAR(255)  | ID of the competition bracket            |
| registration_fee_info       | JSON          | Details about registration fees           |
| has_finished               | BOOLEAN       | Indicates if the competition is finished |
| prize_pool                 | FLOAT         | Total prize pool                         |
| bettors                    | JSON          | Users betting on the competition         |
| bettors_count              | INT           | Number of bettors                        |

### 6. customCompetitions (User-Created Competitions)
| Column Name                | Data Type     | Description                             |
|----------------------------|---------------|-----------------------------------------|
| competition_id             | VARCHAR(255)  | Unique identifier for the competition   |
| game_type                  | VARCHAR(100)  | Type of game                            |
| has_finished               | BOOLEAN       | Status of competition completion        |
| team_names                 | JSON          | Teams involved                          |
| starting_epoch             | INT           | Start time (epoch)                     |
| expiration_epoch           | INT           | Expiration time                         |
| bracket_id                 | VARCHAR(255)  | Bracket ID for the competition          |
| rules                      | TEXT          | Rules of the competition                |
| image_url                  | TEXT          | Competition image URL                   |
| bettors                    | JSON          | List of bettors                         |
| bettors_count              | INT           | Number of participants                  |
| prize_pool                 | FLOAT         | Prize money                             |

### 7. raffles (Raffle System)
| Column Name                | Data Type     | Description                             |
|----------------------------|---------------|-----------------------------------------|
| raffle_id                  | UUID          | Unique raffle ID                        |
| title                      | VARCHAR(255)  | Title of the raffle                     |
| details                    | TEXT          | Description of the raffle               |
| rules                      | TEXT          | Rules of the raffle                     |
| creator                    | JSON          | Creator details                         |
| price_per_ticket           | FLOAT         | Ticket price                            |
| tickets_sold               | INT           | Number of tickets sold                  |
| image_url                  | TEXT          | Image for the raffle                    |
| start_date                 | TIMESTAMP     | Start time of the raffle                |
| end_date                   | TIMESTAMP     | End time of the raffle                  |
| total_likes                | INT           | Number of likes on the raffle           |

### 8. userSpendingSummaries (User Spending Data)
| Column Name                | Data Type     | Description                             |
|----------------------------|---------------|-----------------------------------------|
| user_id                    | VARCHAR(255)  | Unique user identifier                  |
| total_usd_spent            | FLOAT         | Total money spent by user               |

### 9. ethPriceSnapshots (ETH Price Tracking)
| Column Name                | Data Type     | Description                             |
|----------------------------|---------------|-----------------------------------------|
| timestamp                  | TIMESTAMP     | Time of snapshot                        |
| eth_price_usd              | FLOAT         | Price of ETH in USD                    |

### 10. leaderboard (Competition Rankings)
| Column Name                | Data Type     | Description                             |
|----------------------------|---------------|-----------------------------------------|
| leaderboard_7_days         | JSON          | Leaderboard for the last 7 days        |
| leaderboard_30_days        | JSON          | Leaderboard for the last 30 days       |
| last_updated               | TIMESTAMP     | Last updated time                       |

### 11. notifications
| Column Name                | Data Type     | Description                             |
|----------------------------|---------------|-----------------------------------------|
| notification_id            | VARCHAR(255)  | Unique ID for the notification          |
| image_url                  | TEXT          | Image associated with the notification   |
| bracket_id                 | VARCHAR(255)  | Bracket ID of the competition           |
| title                      | VARCHAR(255)  | Title of the notification               |
| message                    | TEXT          | Notification message                     |
| timestamp                  | TIMESTAMP     | Time of notification                    |

### 12. referrals
| Column Name                | Data Type     | Description                             |
|----------------------------|---------------|-----------------------------------------|
| referral_id                | VARCHAR(255)  | Unique referral code                    |
| creator                    | VARCHAR(255)  | Creator of the referral code            |
| used_by                   | VARCHAR(255)  | User who used the referral              |
| status                     | VARCHAR(100)  | Status of the referral                  |
| rewarded                   | BOOLEAN       | Whether the user was rewarded           |

# Conclusion
The BRKT platform is a blockchain-based prediction and betting marketplace. It provides users with:
- Competitive games & events
- Crypto-powered rewards
- Smart contract automation
- Transparent & decentralized betting

This makes it a unique Web3 gaming & prediction platform combining Ethereum, Aptos, and Firebase for a seamless experience.

## Project Structure

```
BRKTGG/
├── .git/
├── .next/
│   ├── server/
│   │   ├── app/
│   │   │   ├── CompetitionBracket/
│   │   │   │   └── [competitionId]/
│   │   │   │   │   ├── page_client-reference-manifest.js
│   │   │   │   │   └── page.js
│   │   │   ├── competitions/
│   │   │   │   ├── page_client-reference-manifest.js
│   │   │   │   └── page.js
│   │   │   └── CreateCompetition/
│   │   │   │   ├── page_client-reference-manifest.js
│   │   │   │   └── page.js
│   │   ├── vendor-chunks/
│   │   └── webpack-runtime.js
│   ├── static/
│   ├── types/
│   │   ├── app/
│   │   │   ├── CompetitionBracket/
│   │   │   │   └── [competitionId]/
│   │   │   │   │   ├── layout.ts
│   │   │   │   │   └── page.ts
│   │   │   ├── competitions/
│   │   │   │   └── page.ts
│   │   │   ├── CreateCompetition/
│   │   │   │   └── page.ts
│   │   │   └── layout.ts
│   │   ├── cache-life.d.ts
│   │   └── package.json
│   ├── app-build-manifest.json
│   ├── build-manifest.json
│   ├── package.json
│   ├── react-loadable-manifest.json
│   └── trace
├── ABI/
│   ├── CompetitionFactory.json
│   ├── ConditionalTokens.json
│   ├── ConditionalTokens.txt
│   ├── ERC20.json
│   ├── ERC20MockDecimals.json
│   ├── FixedProductMarketMaker.json
│   ├── FixedProductMarketMaker.txt
│   ├── FPMMDeterministicFactory.json
│   ├── PaidPredictableABI.json
│   └── router.json
├── components/
│   ├── ui/
│   │   ├── SheetSide.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── use-toast.ts
│   ├── utils/
│   │   ├── .DS_Store
│   │   ├── addNotification.ts
│   │   ├── openGraphImageResponse.tsx
│   │   └── utils.ts
│   ├── .DS_Store
│   ├── BracketPreview.tsx
│   ├── Card.tsx
│   ├── CompetitionCard.tsx
│   ├── CompetitionPage.tsx
│   ├── CompetitionSlider.tsx
│   ├── CreateBracket.tsx
│   ├── CreateRaffle.tsx
│   ├── DollarInputBox.tsx
│   ├── EntryPage.tsx
│   ├── Event.tsx
│   ├── EventCard.tsx
│   ├── EventsComponent.tsx
│   ├── EventsPage.tsx
│   ├── Footer.tsx
│   ├── GridViewComponent.tsx
│   ├── IPTracker.tsx
│   ├── Leaderboard.tsx
│   ├── LottiePlayer.tsx
│   ├── MarketInfoModal.tsx
│   ├── Modal.tsx
│   ├── ModalContent.tsx
│   ├── Navbar.tsx
│   ├── Quantitypicker.tsx
│   ├── RaffleComponent.tsx
│   ├── RichTextEditor.tsx
│   ├── TableComponentlp.tsx
│   ├── TableSection.tsx
│   ├── utils.ts
│   ├── Web3Provider.tsx
│   └── WheelComponent.tsx
├── contexts/
│   └── WalletContext.tsx
├── functions/
│   ├── lib/
│   │   └── serviceAccountKey.json
│   ├── src/
│   │   └── index.ts
│   ├── .DS_Store
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── eslint.config.mjs
│   ├── firestore-debug.log
│   ├── package-lock.json
│   ├── package.json
│   ├── serviceAccountKey.json
│   ├── tsconfig.dev.json
│   ├── tsconfig.json
│   ├── ui-debug.log
│   └── yarn.lock
├── node_modules/
├── public/
│   ├── CatSociety/
│   │   ├── assets/
│   │   │   ├── bg.png
│   │   │   ├── BOX.png
│   │   │   ├── button.png
│   │   │   ├── card_back_red.png
│   │   │   ├── JokerButton.png
│   │   │   ├── middle.png
│   │   │   ├── playingCards.png
│   │   │   ├── playingCards.xml
│   │   │   └── titleScreen.png
│   └── win.mp3
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── bets/
│   │   │   │   └── [walletAddress]/
│   │   │   │   │   └── route.ts
│   │   │   ├── bitget/
│   │   │   │   ├── 1/
│   │   │   │   │   └── [walletAddress]/
│   │   │   │   │   │   └── route.ts
│   │   │   │   ├── 3/
│   │   │   │   │   └── [walletAddress]/
│   │   │   │   │   │   └── route.ts
│   │   │   │   ├── 5/
│   │   │   │   │   └── [walletAddress]/
│   │   │   │   │   │   └── route.ts
│   │   │   │   └── utility.ts
│   │   │   ├── profile-redirect.ts
│   │   │   └── utility.ts
│   │   ├── CatSociety/
│   │   │   ├── EligibilityChecker/
│   │   │   │   ├── EligibilityChecker.tsx
│   │   │   │   ├── filteredSharedAddresses.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── game/
│   │   │   │   ├── scenes/
│   │   │   │   │   ├── Boot.ts
│   │   │   │   │   ├── Game.ts
│   │   │   │   │   ├── GameOver.ts
│   │   │   │   │   ├── MainMenu.ts
│   │   │   │   │   └── Preloader.ts
│   │   │   │   ├── EventBus.ts
│   │   │   │   ├── main.ts
│   │   │   │   └── PhaserGame.tsx
│   │   │   ├── BlackJackApp.tsx
│   │   │   ├── CatApp.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── moons.tsx
│   │   │   ├── page.tsx
│   │   │   ├── partnerData.tsx
│   │   │   └── theme.json
│   │   ├── CompetitionBracket/
│   │   │   ├── [competitionId]/
│   │   │   │   ├── utils/
│   │   │   │   │   ├── ActivityTracker.ts
│   │   │   │   │   ├── addNotification.ts
│   │   │   │   │   ├── betPriceHistoryData.ts
│   │   │   │   │   ├── EstimatedPayout.tsx
│   │   │   │   │   └── SwipeIndicator.tsx
│   │   │   │   ├── Activity.tsx
│   │   │   │   ├── BaseMarketButton.tsx
│   │   │   │   ├── BetPriceHistoryGraph.tsx
│   │   │   │   ├── BracketBetButton.tsx
│   │   │   │   ├── BracketSelection.tsx
│   │   │   │   ├── Chat.tsx
│   │   │   │   ├── ConditionalBetPanel.tsx
│   │   │   │   ├── CustomSeed.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── MarketInteractionBox.tsx
│   │   │   │   ├── MarketResolutionPanel.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── ModalContent.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── SmallCard.tsx
│   │   │   │   ├── TabbedViewsComponent.tsx
│   │   │   │   ├── types.ts
│   │   │   │   ├── WalletButton.tsx
│   │   │   │   ├── WalletInfoBox.tsx
│   │   │   │   └── WalletSelectionModal.tsx
│   │   │   └── .DS_Store
│   │   ├── competitions/
│   │   │   └── page.tsx
│   │   ├── CreateCompetition/
│   │   │   └── page.tsx
│   │   ├── data/
│   │   │   ├── DataComponent.tsx
│   │   │   └── page.tsx
│   │   ├── event/
│   │   │   └── [id]/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   ├── events/
│   │   │   └── page.tsx
│   │   ├── leaderboard/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   ├── AvatarUpload.tsx
│   │   │   ├── page.tsx
│   │   │   ├── ProfileBets.tsx
│   │   │   ├── ProfileComponent.tsx
│   │   │   ├── ProfileDetails.tsx
│   │   │   ├── ProfileUser.tsx
│   │   │   └── ReferralCodeGen.tsx
│   │   ├── Raffle/
│   │   │   └── [id]/
│   │   │   │   ├── utils/
│   │   │   │   │   └── addWinnerNotification.ts
│   │   │   │   └── page.tsx
│   │   ├── Rewards/
│   │   │   └── page.tsx
│   │   ├── .DS_Store
│   │   ├── config.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── opengraph-image.png
│   │   └── vanta.d.ts
│   ├── components/
│   │   └── ui/
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── select.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── tooltip.tsx
│   ├── hooks/
│   │   ├── useGoogleAnalytics.ts
│   │   └── useWhitelist.ts
│   ├── lib/
│   │   ├── config.ts
│   │   ├── constants.ts
│   │   └── utils.ts
│   └── .DS_Store
├── types/
│   ├── dummyData.ts
│   └── MarketDataTypes.tsx
├── .DS_Store
├── .env
├── .eslintrc.json
├── .firebaserc
├── .gitignore
├── components.json
├── firebase.json
├── firebaseConfig.ts
├── firestore-debug.log
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── ui-debug.log
├── vercel.json
└── yarn.lock

```