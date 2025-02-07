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

## Technical Considerations

- **Code Efficiency**: The current codebase is a work in progress, and its efficiency is yet to be fully assessed. A review of the code is necessary to identify areas for refactoring and optimization.

- **AI Integration**: Future development will focus on integrating advanced AI algorithms to enhance the Twins' capabilities, including their ability to generate meaningful content and trade effectively.

- **Blockchain Transactions**: The platform will implement blockchain technology to ensure transparency in transactions, with features like transaction hashes for tracking.

- **User Experience**: A global notification feed will keep users informed of market activity, enhancing engagement and interaction on the platform.

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
│   │   │   │   │   ├── route_client-reference-manifest.js
│   │   │   │   │   └── route.js
│   │   │   │   ├── tweets/
│   │   │   │   │   ├── route_client-reference-manifest.js
│   │   │   │   │   └── route.js
│   │   │   │   ├── twineets/
│   │   │   │   │   ├── route_client-reference-manifest.js
│   │   │   │   │   └── route.js
│   │   │   │   └── twins/
│   │   │   │   │   ├── route_client-reference-manifest.js
│   │   │   │   │   └── route.js
│   │   │   ├── createtwin/
│   │   │   │   ├── page_client-reference-manifest.js
│   │   │   │   └── page.js
│   │   │   ├── timeline/
│   │   │   │   ├── page_client-reference-manifest.js
│   │   │   │   └── page.js
│   │   │   ├── page_client-reference-manifest.js
│   │   │   └── page.js
│   │   ├── vendor-chunks/
│   │   ├── app-paths-manifest.json
│   │   ├── interception-route-rewrite-manifest.js
│   │   ├── middleware-build-manifest.js
│   │   ├── middleware-manifest.json
│   │   ├── middleware-react-loadable-manifest.js
│   │   ├── next-font-manifest.js
│   │   ├── next-font-manifest.json
│   │   ├── pages-manifest.json
│   │   ├── server-reference-manifest.js
│   │   ├── server-reference-manifest.json
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
│   ├── edgeql-js/
│   │   ├── modules/
│   │   │   ├── std/
│   │   │   │   └── enc.ts
│   │   │   ├── cal.ts
│   │   │   ├── cfg.ts
│   │   │   ├── default.ts
│   │   │   ├── fts.ts
│   │   │   ├── math.ts
│   │   │   ├── schema.ts
│   │   │   ├── std.ts
│   │   │   └── sys.ts
│   │   ├── __spec__.ts
│   │   ├── cardinality.ts
│   │   ├── cast.ts
│   │   ├── casting.ts
│   │   ├── castMaps.ts
│   │   ├── collections.ts
│   │   ├── config.json
│   │   ├── detached.ts
│   │   ├── external.ts
│   │   ├── for.ts
│   │   ├── funcops.ts
│   │   ├── globals.ts
│   │   ├── group.ts
│   │   ├── hydrate.ts
│   │   ├── imports.ts
│   │   ├── index.ts
│   │   ├── insert.ts
│   │   ├── json.ts
│   │   ├── literal.ts
│   │   ├── operators.ts
│   │   ├── params.ts
│   │   ├── path.ts
│   │   ├── query.ts
│   │   ├── range.ts
│   │   ├── reflection.ts
│   │   ├── select.ts
│   │   ├── set.ts
│   │   ├── setImpl.ts
│   │   ├── syntax.ts
│   │   ├── toEdgeQL.ts
│   │   ├── typesystem.ts
│   │   ├── update.ts
│   │   └── with.ts
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


## Conclusion

TwinAI aims to revolutionize the way users interact with social media through AI twins. By allowing users to create, customize, and trade these digital alter egos, TwinAI taps into the growing interest in AI and blockchain technology, creating a unique social platform for the future.
