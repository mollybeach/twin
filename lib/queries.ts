// path: lib/queries.ts
import edgeql from '../dbschema/edgeql-js'
import { edgeDBCloudClient } from '../lib/client';
import { Twin, Analytics, CryptoHolding, PeakHours, FetchedTweet, Twineet, UserTokenShare, TokenShare, TokenStats, Transaction,  DailyImpressions, ReachByPlatform, TopInteractions, Demographics } from '../dbschema/edgeql-js/modules/default';
import { UserIdType } from '../app/types/types';
import dotenv from 'dotenv';
dotenv.config();

import {
    formatTwin,
    formatAnalytics,
    formatCryptoHolding,
    formatDemographics,
    formatDailyImpressions,
    formatPeakHours,
    formatReachByPlatform,
    formatTopInteractions,
    formatFetchedTweet,
    formatTwineet,
    formatTransaction,
    formatTokenShare,
    formatTokenStats,
    formatUserTokenShare,
    formatVerification,
    formatTwinStats,
} from '../app/utils/formatData';

import {
    TwinType 
} from '../app/types/types';


export const eQlDate = (date: Date) => {
    return edgeql.cast(edgeql.datetime, date);
}

const eQlDecimal = (value: number) => {
    return edgeql.decimal(value.toString());
}

export async function insertTwin(twinData: TwinType): Promise<void> {
    console.log('twinData', twinData);
    const formattedTwin = formatTwin(twinData);
    const formattedAnalytics = formatAnalytics(twinData.analytics);
    const formattedCryptoHoldings = formatCryptoHolding(twinData.analytics.cryptoHoldings[twinData.analytics.cryptoHoldings.length - 1]); // how do i make it the last index of the array
    const formattedDemographics = formatDemographics(twinData.analytics.demographics[twinData.analytics.demographics.length - 1]);
    const formattedDailyImpressions = formatDailyImpressions(twinData.analytics.dailyImpressions[twinData.analytics.dailyImpressions.length - 1]);
    const formattedPeakHours = formatPeakHours(twinData.analytics.peakHours[twinData.analytics.peakHours.length - 1]);
    const formattedReachByPlatform = formatReachByPlatform(twinData.analytics.reachByPlatform[twinData.analytics.reachByPlatform.length - 1]);
    const formattedTopInteractions = formatTopInteractions(twinData.analytics.topInteractions[twinData.analytics.topInteractions.length - 1]);
    const formattedFetchedTweets = formatFetchedTweet(twinData.fetchedTweets[twinData.fetchedTweets.length - 1]);
    const formattedTwineets = formatTwineet(twinData.twineets[twinData.twineets.length - 1] || twinData.twineets[0]);
    const formattedTransactions = formatTransaction(twinData.transactions[twinData.transactions.length - 1]);
    const formattedTokenShares = formatTokenShare(twinData.tokenShares);
    const formattedTokenStats = formatTokenStats(twinData.tokenStats); 
    const formattedUserTokenShares = formatUserTokenShare(twinData.tokenShares.shareholders[twinData.tokenShares.shareholders.length - 1]);

    const analyticsQuery =  edgeql.insert(Analytics, {
        twinId: formattedAnalytics.twinId,
        clickThroughRate: eQlDecimal(twinData.analytics.clickThroughRate),  
        engagementRate: eQlDecimal(twinData.analytics.engagementRate),
        impressions: formattedAnalytics.impressions,
        cryptoHoldings: edgeql.insert(CryptoHolding, {
            twinId: formattedAnalytics.twinId,
            amount: eQlDecimal(formattedCryptoHoldings.amount),
            symbol: formattedCryptoHoldings.symbol,
            change24h: eQlDecimal(formattedCryptoHoldings.change24h),
            value: eQlDecimal(formattedCryptoHoldings.value),
        }),
        demographics: edgeql.insert( Demographics, {
            twinId: formattedAnalytics.twinId,
            age: formattedDemographics.age,
            percentage: eQlDecimal(formattedDemographics.percentage),
        }),
        dailyImpressions: edgeql.insert(DailyImpressions, {
            twinId: formattedAnalytics.twinId,
            date: eQlDate(formattedDailyImpressions.date),
            count: formattedDailyImpressions.count,
        }),
        peakHours: edgeql.insert(PeakHours, {
            twinId: formattedAnalytics.twinId,
            hour: formattedPeakHours.hour,
            engagement: eQlDecimal(formattedPeakHours.engagement),
        }),
        reachByPlatform: edgeql.insert(ReachByPlatform, {
            twinId: formattedAnalytics.twinId,
            platform: formattedReachByPlatform.platform,
            count: formattedReachByPlatform.count,
        }),
        topInteractions: edgeql.insert(TopInteractions, {
            twinId: formattedAnalytics.twinId,
            kind: formattedTopInteractions.kind,
            count: formattedTopInteractions.count,
        })
    });
    
    const fetchedTweetsQuery = await edgeql.insert(FetchedTweet, {
        twinId: twinData.twinId,
        text: formattedFetchedTweets.text,
        tweetId: formattedFetchedTweets.tweetId,
        timestamp: eQlDate(new Date), 
    });

    const twineetsQuery = await edgeql.insert(Twineet, {
        twinId: twinData.twinId,
        content: formattedTwineets.content,
        isLiked: formattedTwineets.isLiked,
        isRetwineeted: formattedTwineets.isRetwineeted,
        likesCount: formattedTwineets.likesCount,
        retwineetsCount: formattedTwineets.retwineetsCount,
        repliesCount: formattedTwineets.repliesCount,
        timestamp: eQlDate(new Date(formattedTwineets.timestamp))
    });

    const transactionsQuery = await edgeql.insert(Transaction, {
        twinId: formattedTransactions.twinId,
        trade: formattedTransactions.trade,
        shares: eQlDecimal(formattedTransactions.shares),
        pricePerShare: eQlDecimal(formattedTransactions.pricePerShare),
        totalAmount: eQlDecimal(formattedTransactions.totalAmount),
        timestamp: eQlDate(formattedTransactions.timestamp)
    });

    const userTokenSharesQuery = await edgeql.insert(UserTokenShare, {
        twinId: formattedUserTokenShares.twinId,
        userId: formattedUserTokenShares.userId,
        shares: edgeql.cast(edgeql.decimal, formattedUserTokenShares.shares),
        purchasePrice: edgeql.decimal(formattedUserTokenShares.purchasePrice.toString()),
        purchaseDate: edgeql.cast(edgeql.datetime, new Date(formattedUserTokenShares.purchaseDate)), 
    });

    const tokenSharesQuery = await edgeql.insert(TokenShare, {
        twinId: formattedTokenShares.twinId,
        totalShares: formattedTokenShares.totalShares,
        availableShares: formattedTokenShares.availableShares,
        pricePerShare: edgeql.decimal(formattedTokenShares.pricePerShare.toString()),
        shareholders: userTokenSharesQuery,
    });

    const tokenStatsQuery = await edgeql.insert(TokenStats, {
        twinId: formattedTokenStats.twinId,
        price: edgeql.decimal(formattedTokenStats.price.toString()),
        change24h: edgeql.decimal(formattedTokenStats.change24h.toString()),
        volume24h: edgeql.decimal(formattedTokenStats.volume24h.toString()),
        marketCap: edgeql.decimal(formattedTokenStats.marketCap.toString()),
    });
    
    const insertTwinQuery = await edgeql.insert(Twin, {
        twinId: formattedTwin.twinId,
        userId: formattedTwin.userId,
        twinHandle: formattedTwin.twinHandle,
        twitterHandle: formattedTwin.twitterHandle,
        profileImage: formattedTwin.profileImage,
        personality: formattedTwin.personality,
        description: formattedTwin.description,
        autoReply: formattedTwin.autoReply,
        isListed: formattedTwin.isListed,
        price: eQlDecimal(formattedTwin.price),
        timestamp: eQlDate(formattedTwin.timestamp), 
        modelData: formattedTwin.modelData,
        analytics: analyticsQuery,
        verification: edgeql.insert(edgeql.Verification, formatVerification(formattedTwin.verification)),
        stats: edgeql.insert(edgeql.TwinStats, formatTwinStats(formattedTwin.stats)),
        tokenShares: tokenSharesQuery,
        fetchedTweets: fetchedTweetsQuery,
        twineets: twineetsQuery,
        tokenStats: tokenStatsQuery,
        transactions: transactionsQuery,
    });
    await insertTwinQuery.run(edgeDBCloudClient);
}

export const getAllTwineetsQuery = `
    SELECT Twineet {
        id,
        twinId,
        content,
        timestamp,
        likesCount,
        retwineetsCount,
        repliesCount,
        isLiked,
        isRetwineeted
    };
`;

export const getTwineetByIdQuery = `
    SELECT Twineet {
        id,
        twinId,
        content,
        timestamp,
        likesCount,
        retwineetsCount,
        repliesCount,
        isLiked,
        isRetwineeted
    } 
    FILTER .id = <uuid>$twineetId;
`;

export const getUserDataQuery = `
    SELECT User {
        userId,
        username,
        email,
        walletBalance,
        walletAddress,
        timestamp,
        birthday,
        twins : {
            twinId,
            twinHandle,
            twitterHandle,
            profileImage,
            isListed,
            price,
            twineets : {
                twinId,
                content,
                timestamp,
                likesCount,
                retwineetsCount,
                repliesCount
            }
        },
        notifications :{
            twinId,
            kind,
            message,
            twinHandle,
            twitterHandle,
            timestamp
        },
        tokenShares : {
            twinId,
            pricePerShare,
            totalShares,
            availableShares,
            shareholders : {
                twinId,
                userId,
                shares,
                purchasePrice,
                purchaseDate
            }
        },
        userTokenShares :{
            twinId,
            userId,
            shares,
            purchasePrice,
            purchaseDate
        },
        likes : {
            twinId,
            userId
        },
        retwineets : {
            twinId,
            userId
        },
        replies : {
            twinId,
            userId
        }
    }
`;

export const getUserByUserIdQuery = `
    SELECT User {
        userId,
        username,
        email,
        walletBalance,
        walletAddress,
        timestamp,
        birthday,
        twins : {
            twinId,
            twinHandle,
            twitterHandle,
            profileImage,
            isListed,
            price,
            twineets : {
                twinId,
                content,
                timestamp,
                likesCount,
                retwineetsCount,
                repliesCount
            }
        },
        notifications :{
            twinId,
            kind,
            message,
            twinHandle,
            twitterHandle,
            timestamp
        },
        tokenShares : {
            twinId,
            pricePerShare,
            totalShares,
            availableShares,
            shareholders : {
                twinId,
                userId,
                shares,
                purchasePrice,
                purchaseDate
            }
        },
        userTokenShares :{
            twinId,
            userId,
            shares,
            purchasePrice,
            purchaseDate
        },
        likes : {
            twinId,
            userId
        },
        retwineets : {
            twinId,
            userId
        },
        replies : {
            twinId,
            userId
        }
    }
    FILTER .userId = <str>$userId;
`;

export const getAllTwinsQuery = `
    SELECT Twin {
        twinId,
        userId,
        username,
        email,
        walletBalance,
        walletAddress,
        timestamp,
        birthday,
        profileImage,
        isListed,
        personality,
        twinHandle,
        twitterHandle,
        analytics: {
            twinId,
            clickThroughRate,
            engagementRate,
            impressions,
            cryptoHoldings: {
                twinId,
                amount,
                symbol,
                value,
                change24h
            },
            demographics: {
                twinId,
                age,
                percentage
            },
            dailyImpressions: {
                twinId,
                count,
                date
            },
            peakHours: {
                twinId,
                engagement,
                hour
            },
            reachByPlatform: {
                twinId,
                platform,
                count
            },
            topInteractions: {
                twinId,
                kind,
                count
            }
        },
        fetchedTweets: {
            id,
            content,
            timestamp,
            likesCount,
            retwineetsCount,
            repliesCount,
            isLiked,
            isRetwineeted
        },
        modelData,
        stats: {
            twinId,
            interactions,
            repliesCount,
            uptime
        },
        tokenShares: {
            twinId,
            pricePerShare,
            totalShares,
            availableShares,
            shareholders: {
                userId,
                shares,
                purchasePrice,
                purchaseDate
            }
        },
        userTokenShares: {
            userId,
            twinId,
            shares,
            purchasePrice,
            purchaseDate
        },
        verification: {
            twinId,
            isVerified,
            verificationDate,
            error
        },
        transactions: {
            twinId,
            trade,
            shares,
            pricePerShare,
            totalAmount,
            timestamp
        }
    };
`;


export const getTwinByIdQuery = `
    SELECT Twin {
        twinId,
        userId,
        username,
        email,
        walletBalance,
        walletAddress,
        timestamp,
        birthday,
        profileImage,
        isListed,
        personality,
        twinHandle,
        twitterHandle,
        analytics: {
            twinId,
            clickThroughRate,
            engagementRate,
            impressions,
            cryptoHoldings: {
                twinId,
                amount,
                symbol,
                value,
                change24h
            },
            demographics: {
                twinId,
                age,
                percentage
            },
            dailyImpressions: {
                twinId,
                count,
                date
            },
            peakHours: {
                twinId,
                engagement,
                hour
            },
            reachByPlatform: {
                twinId,
                platform,
                count
            },
            topInteractions: {
                twinId,
                kind,
                count
            }
        },
        fetchedTweets: {
            id,
            content,
            timestamp,
            likesCount,
            retwineetsCount,
            repliesCount,
            isLiked,
            isRetwineeted
        },
        modelData,
        stats: {
            twinId,
            interactions,
            repliesCount,
            uptime
        },
        tokenShares: {
            twinId,
            pricePerShare,
            totalShares,
            availableShares,
            shareholders: {
                userId,
                shares,
                purchasePrice,
                purchaseDate
            }
        },
        userTokenShares: {
            userId,
            twinId,
            shares,
            purchasePrice,
            purchaseDate
        },
        verification: {
            twinId,
            isVerified,
            verificationDate,
            error
        },
        transactions: {
            twinId,
            kind,
            shares,
            pricePerShare,
            totalAmount,
            timestamp
        }
    }
    FILTER .twinId = <str>$twinId;
`;

export const createInsertUserQuery = (userData: {
    userId: UserIdType;
    username: string;
    email: string;
    passwordHash: string;
    birthday?: Date;
    walletBalance?: number;
    walletAddress?: string;
    timestamp?: Date;
}) => {
    const { birthday, walletBalance, walletAddress} = userData;

    let query = `
        INSERT User {
            userId := <str>$userId,
            username := <str>$username,
            email := <str>$email,
            passwordHash := <str>$passwordHash,
    `;

    if (birthday) {
        query += `birthday := <datetime>$birthday,`;
    }
    if (walletBalance !== undefined) {
        query += `walletBalance := <decimal>$walletBalance,`;
    }
    if (walletAddress) {
        query += `walletAddress := <str>$walletAddress,`;
    }
    query += `timestamp := datetime_current();`;

    return query;
};

export const insertTwinQueryString = `
    INSERT Twin {
        userId := <UserIdType>$userId,
        twinId := <TwinIdType>$twinId,
        autoReply := <bool>$autoReply,
        timestamp := datetime_current(),
        description := <str>$description,
        personality := <str>$personality,
        price := <decimal>$price,
        profileImage := <str>$profileImage,
        isListed := <bool>$isListed,
        twinHandle := <str>$twinHandle,
        twitterHandle := <str>$twitterHandle,
        analytics := (
            INSERT Analytics {
                twinId := <TwinIdType>$twinId,
                clickThroughRate := <decimal>$clickThroughRate,
                engagementRate := <decimal>$engagementRate,
                impressions := <int16>$impressions,
                cryptoHoldings := (
                    FOR holding IN <array<CryptoHolding>>$cryptoHoldings
                    UNION (
                        INSERT CryptoHolding {
                            twinId := <TwinIdType>$twinId,
                            amount := <decimal>$amount,
                            symbol := <str>$symbol,
                            value := <decimal>$value,
                            change24h := <decimal>$change24h
                        }
                    )
                ),
                demographics := (
                    FOR demo IN <array<Demographics>>$demographics
                    UNION (
                        INSERT Demographics {
                            twinId := <TwinIdType>$twinId,
                            age := <AgeGroup>$age,
                            percentage := <decimal>$percentage
                        }
                    )
                ),
                dailyImpressions := (
                    FOR impression IN <array<DailyImpressions>>$dailyImpressions
                    UNION (
                        INSERT DailyImpressions {
                            twinId := <TwinIdType>$twinId,
                            count := <int16>$count,
                            date := datetime_current()
                        }
                    )
                ),
                peakHours := (
                    FOR hour IN <array<PeakHours>>$peakHours
                    UNION (
                        INSERT PeakHours {
                            twinId := <TwinIdType>$twinId,
                            engagement := <decimal>$engagement,
                            hour := <int16>$hour
                        }
                    )
                ),
                reachByPlatform := (
                    FOR platform IN <array<ReachByPlatform>>$reachByPlatform
                    UNION (
                        INSERT ReachByPlatform {
                            twinId := <TwinIdType>$twinId,
                            platform := <PlatformType>$platform,
                            count := <int16>$count
                        }
                    )
                ),
                topInteractions := (
                    FOR interaction IN <array<TopInteractions>>$topInteractions
                    UNION (
                        INSERT TopInteractions {
                            twinId := <TwinIdType>$twinId,
                            kind := <InteractionGroup>$kind,
                            count := <int16>$count
                        }
                    )
                )
            }
        ),
        fetchedTweets := (
            FOR tweet IN <array<FetchedTweet>>$fetchedTweets
            UNION (
                INSERT FetchedTweet {
                    twinId := <TwinIdType>$twinId, 
                    text := <str>$text,
                    edit_history_tweet_ids := <array<str>>$edit_history_tweet_ids,
                    timestamp := datetime_current()
                }
            )
        ),
        modelData := <json>$modelData,
        stats := (
            INSERT TwinStats {
                twinId := <TwinIdType>$twinId, 
                interactions := <int16>$interactions,
                repliesCount := <int16>$repliesCount,
                uptime := <str>$uptime
            }
        ),
        tokenShares := (
            INSERT TokenShare {
                twinId := <TwinIdType>$twinId,
                totalShares := <int16>$totalShares,
                availableShares := <int16>$availableShares,
                pricePerShare := <decimal>$pricePerShare,
                shareholders := (
                    FOR shareholder IN <array<UserTokenShare>>$shareholders
                    UNION (
                        INSERT UserTokenShare {
                            twinId := <TwinIdType>$twinId, 
                            userId := <UserIdType>$userId,
                            shares := <decimal>$shares,
                            purchasePrice := <decimal>$purchasePrice,
                            purchaseDate := datetime_current()
                        }
                    )
                )
            }
        ),
        tokenStats := (
            INSERT TokenStats {
                twinId := <TwinIdType>$twinId,
                price := <decimal>$price,
                change24h := <decimal>$change24h,
                volume24h := <decimal>$volume24h,
                marketCap := <decimal>$marketCap
            }
        ),
        twineets := (
            FOR twineet IN <array<Twineet>>$twineets
            UNION (
                INSERT Twineet {
                    twinId := <TwinIdType>$twinId,
                    content := <str>$content,
                    timestamp := datetime_current(),
                    likesCount := <int16>$likesCount,
                    retwineetsCount := <int16>$retwineetsCount,
                    repliesCount := <int16>$repliesCount,
                    isLiked := <bool>$isLiked,
                    isRetwineeted := <bool>$isRetwineeted
                }
            )
        ),
        verification := (
            INSERT Verification {
                twinId := <TwinIdType>$twinId,
                isVerified := <bool>$isVerified,
                verificationDate := datetime_current()
            }
        ),
        transactions := (
            FOR transaction IN <array<Transaction>>$transactions
            UNION (
                INSERT Transaction {
                    twinId := <TwinIdType>$twinId,
                    trade := <TransactionGroup>$trade,
                    shares := <decimal>$shares,
                    pricePerShare := <decimal>$pricePerShare,
                    totalAmount := <decimal>$totalAmount,
                    timestamp := datetime_current()
                }
            )
        )
    };
`;
