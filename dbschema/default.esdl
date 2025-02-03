module default {
    scalar type AgentIdType extending str;
    type CryptoHolding {
        required property agentId -> AgentIdType;
        required property amount -> decimal;
        required property symbol -> str;
        required property change24h -> decimal;
        required property value -> decimal;
    } 

    type Demographics {
        required property agentId -> AgentIdType;
        required property age -> str;
        required property percentage -> decimal;
    }

    type DailyImpressions {
        required property agentId -> AgentIdType;
        required property date -> str;
        required property count -> int16;
    }

    type PeakHours {
        required property agentId -> AgentIdType;
        required property hour -> int16;
        required property engagement -> decimal;
    }

    type ReachByPlatform {
        required property agentId -> AgentIdType;
        required property platform -> str;
        required property count -> int16;
    }

    type TopInteractions {
        required property agentId -> AgentIdType;
        required property kind -> str;
        required property count -> int16;
    }

    type Analytics {
        required property agentId -> AgentIdType;
        required property clickThroughRate -> decimal;
        required property engagementRate -> decimal;
        required property impressions -> int16;
        required link cryptoHoldings -> CryptoHolding;
        required link demographics -> Demographics;
        required link dailyImpressions -> DailyImpressions;
        required link peakHours -> PeakHours;
        required link reachByPlatform -> ReachByPlatform;
        required link topInteractions -> TopInteractions;
    }

    type UserTokenShare {
        required property agentId -> AgentIdType;
        required property userId -> str;
        required property shares -> decimal;
        required property purchasePrice -> decimal;
        required property purchaseDate -> datetime;
    }

    type TokenShare {
        required property agentId -> AgentIdType;
        required property totalShares -> int16;
        required property availableShares -> int16;
        required property pricePerShare -> decimal;
        required multi link shareholders -> UserTokenShare;
    }

    # Define the TokenStats type
    type TokenStats {
        required property agentId -> AgentIdType;
        required property price -> decimal;
        required property change24h -> decimal;
        required property volume24h -> decimal;
        required property marketCap -> decimal;
    }

    # Define the TransactionType enum
    scalar type TransactionType extending enum<'buy', 'sell'>;

    # Define the Transaction type
    type Transaction {
        required property agentId -> AgentIdType;
        required property kind -> TransactionType;
        required property shares -> int16;
        required property pricePerShare -> decimal;
        required property totalAmount -> decimal;
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    }

    # Define the FetchedTweet type
    type FetchedTweet {
        required property agentId -> AgentIdType;
        required property text -> str;
        required property edit_history_tweet_ids -> array<str>;
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    }

    # Define the Twineet type
    type Twineet {
        required property agentId -> AgentIdType;
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

    type Verification {
        required property agentId -> AgentIdType;
        required property isVerified -> bool;
        required property verificationDate -> datetime;
    }

    # Define the AgentStats type
    type AgentStats {
        required property agentId -> AgentIdType;
        required property replies -> int16;
        required property interactions -> int16;
        required property uptime -> str;
    }

    # Define the Agent type
    type Agent {
        required property agentId -> AgentIdType { 
            constraint exclusive
        }
        required property createdAt -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
        required property twinHandle -> str;
        required property twitterHandle -> str;
        required property profileImage -> str;
        required property personality -> str;
        required property description -> str;
        required property autoReply -> bool;
        required property isListed -> bool;
        required property price -> decimal;
        required link stats -> AgentStats;
        required link verification -> Verification;
        required link analytics -> Analytics;
        required property modelData -> json;
        # Change these to multi links to allow arrays
        required multi link twineets -> Twineet;
        required multi link fetchedTweets -> FetchedTweet; 
        required link tokenShares -> TokenShare; 
        required link tokenStats -> TokenStats;
        required multi link transactions -> Transaction;
    }

    scalar type NotificationType extending enum<'create', 'buy', 'sell'>;

    # Define the Notification type
    type Notification {
        required property agentId -> AgentIdType;
        required property kind -> NotificationType;
        required property message -> str;
        required property twinHandle -> str;
        required property twitterHandle -> str;
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    }
}