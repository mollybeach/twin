module default {
    scalar type UserIdType extending str;
    scalar type TwinIdType extending str;
    scalar type AgeGroup extending enum<'18-24', '25-34', '35-44', '45-54', '55+'>;
    scalar type InteractionGroup extending enum<'likes', 'retwineets', 'replies', 'quotes'>;
    scalar type NotificationGroup extending enum<'create', 'buy', 'sell'>;
    scalar type PlatformType extending enum<'mobile', 'desktop', 'tablet'>;
    scalar type TransactionGroup extending enum<'buy', 'sell'>;

    type CryptoHolding {
        required property twinId -> TwinIdType;
        required property amount -> decimal;
        required property symbol -> str;
        required property change24h -> decimal;
        required property value -> decimal;
    } 

    type Demographics {
        required property twinId -> TwinIdType;
        required property age -> AgeGroup;
        required property percentage -> decimal;
    }

    type DailyImpressions {
        required property twinId -> TwinIdType;
        required property date -> datetime;
        required property count -> int16;
    }

    type PeakHours {
        required property twinId -> TwinIdType;
        required property hour -> int16;
        required property engagement -> decimal;
    }

    type ReachByPlatform {
        required property twinId -> TwinIdType;
        required property platform -> PlatformType;
        required property count -> int16;
    }

    type TopInteractions {
        required property twinId -> TwinIdType;
        required property kind -> InteractionGroup;
        required property count -> int16;
    }

    type Analytics {
        required property twinId -> TwinIdType;
        required property clickThroughRate -> decimal;
        required property engagementRate -> decimal;
        required property impressions -> int16;
        required multi link cryptoHoldings -> CryptoHolding;
        required multi link demographics -> Demographics;
        required multi link dailyImpressions -> DailyImpressions;
        required multi link peakHours -> PeakHours;
        required multi link reachByPlatform -> ReachByPlatform;
        required multi link topInteractions -> TopInteractions;
    }

    type UserTokenShare {
        required property twinId -> TwinIdType;
        required property userId -> str;
        required property shares -> decimal;
        required property purchasePrice -> decimal;
        required property purchaseDate -> datetime;
    }

    type TokenShare {
        required property twinId -> TwinIdType;
        required property totalShares -> int16;
        required property availableShares -> int16;
        required property pricePerShare -> decimal;
        required multi link shareholders -> UserTokenShare;
    }

    # Define the TokenStats type
    type TokenStats {
        required property twinId -> TwinIdType;
        required property price -> decimal;
        required property change24h -> decimal;
        required property volume24h -> decimal;
        required property marketCap -> decimal;
    }

    # Define the Transaction type
    type Transaction {
        required property twinId -> TwinIdType;
        required property trade -> TransactionGroup;
        required property shares -> decimal;
        required property pricePerShare -> decimal;
        required property totalAmount -> decimal;
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    }

    # Define the FetchedTweet type
    type FetchedTweet {
        required property twinId -> TwinIdType;
        required property text -> str;
        required property tweetId -> str;
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    }

    # Define the Twineet type
    type Twineet {
        required property twinId -> TwinIdType;
        required property userId -> UserIdType {
            default := "f47ac10b-58cc-4372-a567-0e02b2c3d479";
        }
        required property content -> str;
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
        required property likesCount -> int16 {
            default := <int16>0;  # Default value for likes
        }
        required property retwineetsCount -> int16 {
            default := <int16>0;  # Default value for retwineets
        }
        required property repliesCount -> int16 {
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
        required property twinId -> TwinIdType;
        required property isVerified -> bool;
        required property verificationDate -> datetime;
    }

    # Define the TwinStats type
    type TwinStats {
        required property twinId -> TwinIdType;
        required property repliesCount -> int16;
        required property interactions -> int16;
        required property uptime -> str;
    }

    type Followers {
        required property twinId -> TwinIdType;
        required property userId -> array<UserIdType>;
    }

    type Following {
        required property userId -> UserIdType;
        required property following -> array<TwinIdType>;
    }
    # Define the Twin type
    type Twin {
        required property twinId -> TwinIdType { 
            constraint exclusive
        }
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
        required property userId -> UserIdType {
            default := "f47ac10b-58cc-4372-a567-0e02b2c3d479";
        }
        required property twinHandle -> str;
        required property twitterHandle -> str;
        required property profileImage -> str;
        required property personality -> str;
        required property description -> str;
        required property autoReply -> bool;
        required property isListed -> bool;
        required property price -> decimal;
        required link stats -> TwinStats;
        required link verification -> Verification;
        required link analytics -> Analytics;
        required property modelData -> json;
        # Change these to multi links to allow arrays
        required multi link twineets -> Twineet;
        required multi link fetchedTweets -> FetchedTweet; 
        required link tokenShares -> TokenShare; 
        required link tokenStats -> TokenStats;
        required multi link transactions -> Transaction;
        optional link followers -> Followers;
    }

    type Likes {
        required property twinId -> TwinIdType;
        required property userId -> UserIdType;
    }

    type Retwineets {
        required property twinId -> TwinIdType;
        required property userId -> UserIdType;
    }

    type Replies {
        required property content -> str;
        required property likes -> int16;
        required property timestamp -> datetime;
        required property twinId -> TwinIdType;
        required property userId -> UserIdType;
    }

    # Define the User type
    type User {
        optional property birthday -> datetime;
        required property timestamp -> datetime {
            default := datetime_current(); 
        }
        required property email -> str {
            constraint exclusive
        }
        optional multi link likes -> Likes;
        optional multi link notifications -> Notification;
        required property passwordHash -> str;
        optional multi link replies -> Replies;
        optional multi link retwineets -> Retwineets;
        optional multi link tokenShares -> TokenShare;
        optional multi link tokenStats -> TokenStats;
        optional multi link transactions -> Transaction;
        optional multi link twins -> Twin;
        required property userId -> UserIdType {
            constraint exclusive
        }
        required property username -> str {
            constraint exclusive
        }
        optional multi link userTokenShares -> UserTokenShare;
        required property walletAddress -> str;
        required property walletBalance -> decimal{
            default := <decimal>1000000;
        }
        optional link following -> Following;
    }

    # Define the Notification type
    type Notification {
        required property twinId -> TwinIdType;
        required property kind -> NotificationGroup;
        required property message -> str;
        required property twinHandle -> str;
        required property twitterHandle -> str;
        required property timestamp -> datetime {
            default := datetime_current();  # Default to the current timestamp
        }
    }
}
