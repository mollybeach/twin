module default {
    # Define the TokenShare type
    type TokenShare {
        required property userId -> str;
        required property shares -> int16;
        required property purchasePrice -> decimal;
        required property purchaseDate -> datetime;
    }

    # Define the TokenStats type
    type TokenStats {
        required property price -> decimal;
        required property change24h -> decimal;
        required property volume24h -> decimal;
        required property marketCap -> decimal;
    }

    # Define the TransactionType enum
    scalar type TransactionType extending enum<'buy', 'sell'>;

    # Define the Transaction type
    type Transaction {
        required property agentId -> str;
        required property type -> TransactionType;
        required property shares -> int16;
        required property pricePerShare -> decimal;
        required property totalAmount -> decimal;
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    }

    # Define the FetchedTweet type
    type FetchedTweet {
        required property text -> str;
        required property edit_history_tweet_ids -> array<str>;
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    }

    # Define the Twineet type
    type Twineet {
        required property agentId -> str;
        required property content -> str;
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
        required property likes -> int16 {
            default := <int16>0;  # Default value for likes
        }
        required property retwineets -> int16 {
            default := <int16>0;  # Default value for retwineets
        }
        required property replies -> int16 {
            default := <int16>0;  # Default value for replies
        }
        required property isLiked -> bool {
            default := false;  # Default to false
        }
        required property isRetwineeted -> bool {
            default := false;  # Default to false
        }
    }

    # Define the AgentStats type
    type AgentStats {
        required property replies -> int16;
        required property interactions -> int16;
        required property uptime -> str;
    }

    # Define the AgentConfig type
    type AgentConfig {
        required property agentId -> str {
            constraint exclusive
        }
        required property twinHandle -> str;
        required property twitterHandle -> str;
        required property personality -> str;
        required property description -> str;
        required property autoReply -> bool;
        required property price -> decimal;
        required property isListed -> bool;
        required property profileImage -> str;
        required property modelData -> json;
        required link twineets -> Twineet;
        required link fetchedTweets -> FetchedTweet;
        required link stats -> AgentStats;
    }

    # Define the Agent type
    type Agent {
        required property createdAt -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
        required property twinHandle -> str;
        required property twitterHandle -> str;
        required property personality -> str;
        required property description -> str;
        required property price -> decimal;
        required property profileImage -> str;
        required link stats -> AgentStats;
        required link tokenShares -> TokenShare;
        required property verification -> json;
        required property analytics -> json;
        required property modelData -> json;
        required link twineets -> Twineet;
        required link fetchedTweets -> FetchedTweet;
    }

    scalar type NotificationType extending enum<'create', 'buy', 'sell'>;

    # Define the Notification type
    type Notification {
        required property type -> NotificationType;
        required property message -> str;
        required property twinHandle -> str;
        required property twitterHandle -> str;
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    }

    # Define the MarketplaceStore type
    type MarketplaceStore {
        required link agents -> Agent;
        required link transactions -> Transaction;
        required link notification -> Notification;
    }
}
