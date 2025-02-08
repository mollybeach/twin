// GENERATED by @edgedb/generate v0.5.6

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
export type $AgeGroup = {
  "18-24": $.$expr_Literal<$AgeGroup>;
  "25-34": $.$expr_Literal<$AgeGroup>;
  "35-44": $.$expr_Literal<$AgeGroup>;
  "45-54": $.$expr_Literal<$AgeGroup>;
  "55+": $.$expr_Literal<$AgeGroup>;
} & $.EnumType<"default::AgeGroup", ["18-24", "25-34", "35-44", "45-54", "55+"]>;
const AgeGroup: $AgeGroup = $.makeType<$AgeGroup>(_.spec, "6a6a6e10-e51c-11ef-83f8-75cfc3789a11", _.syntax.literal);

export type $InteractionGroup = {
  "likes": $.$expr_Literal<$InteractionGroup>;
  "retwineets": $.$expr_Literal<$InteractionGroup>;
  "replies": $.$expr_Literal<$InteractionGroup>;
  "quotes": $.$expr_Literal<$InteractionGroup>;
} & $.EnumType<"default::InteractionGroup", ["likes", "retwineets", "replies", "quotes"]>;
const InteractionGroup: $InteractionGroup = $.makeType<$InteractionGroup>(_.spec, "6a6a7d9c-e51c-11ef-9059-c7d95ee403aa", _.syntax.literal);

export type $NotificationGroup = {
  "create": $.$expr_Literal<$NotificationGroup>;
  "buy": $.$expr_Literal<$NotificationGroup>;
  "sell": $.$expr_Literal<$NotificationGroup>;
} & $.EnumType<"default::NotificationGroup", ["create", "buy", "sell"]>;
const NotificationGroup: $NotificationGroup = $.makeType<$NotificationGroup>(_.spec, "6a6a8b20-e51c-11ef-9d22-4d66457b2b78", _.syntax.literal);

export type $PlatformType = {
  "mobile": $.$expr_Literal<$PlatformType>;
  "desktop": $.$expr_Literal<$PlatformType>;
  "tablet": $.$expr_Literal<$PlatformType>;
} & $.EnumType<"default::PlatformType", ["mobile", "desktop", "tablet"]>;
const PlatformType: $PlatformType = $.makeType<$PlatformType>(_.spec, "6a6a98cc-e51c-11ef-8ea7-8fa0b1c0c7d6", _.syntax.literal);

export type $TransactionGroup = {
  "buy": $.$expr_Literal<$TransactionGroup>;
  "sell": $.$expr_Literal<$TransactionGroup>;
} & $.EnumType<"default::TransactionGroup", ["buy", "sell"]>;
const TransactionGroup: $TransactionGroup = $.makeType<$TransactionGroup>(_.spec, "6a6aa90c-e51c-11ef-b518-d3a0e0c3164a", _.syntax.literal);

export type $TwinIdType = $.ScalarType<"std::str", string>;
const TwinIdType: $.scalarTypeWithConstructor<_std.$str, never> = $.makeType<$.scalarTypeWithConstructor<_std.$str, never>>(_.spec, "6a6abb22-e51c-11ef-a749-b32b777280c1", _.syntax.literal);

export type $UserIdType = $.ScalarType<"std::str", string>;
const UserIdType: $.scalarTypeWithConstructor<_std.$str, never> = $.makeType<$.scalarTypeWithConstructor<_std.$str, never>>(_.spec, "de29a0e4-e528-11ef-a0e2-a3946697e098", _.syntax.literal);

export type $AnalyticsλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "clickThroughRate": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "engagementRate": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "impressions": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "cryptoHoldings": $.LinkDesc<$CryptoHolding, $.Cardinality.AtLeastOne, {}, false, false,  false, false>;
  "dailyImpressions": $.LinkDesc<$DailyImpressions, $.Cardinality.AtLeastOne, {}, false, false,  false, false>;
  "demographics": $.LinkDesc<$Demographics, $.Cardinality.AtLeastOne, {}, false, false,  false, false>;
  "peakHours": $.LinkDesc<$PeakHours, $.Cardinality.AtLeastOne, {}, false, false,  false, false>;
  "reachByPlatform": $.LinkDesc<$ReachByPlatform, $.Cardinality.AtLeastOne, {}, false, false,  false, false>;
  "topInteractions": $.LinkDesc<$TopInteractions, $.Cardinality.AtLeastOne, {}, false, false,  false, false>;
  "<analytics[is Twin]": $.LinkDesc<$Twin, $.Cardinality.Many, {}, false, false,  false, false>;
  "<analytics": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Analytics = $.ObjectType<"default::Analytics", $AnalyticsλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Analytics = $.makeType<$Analytics>(_.spec, "a4317b20-e51c-11ef-9b65-072e020617d7", _.syntax.literal);

const Analytics: $.$expr_PathNode<$.TypeSet<$Analytics, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Analytics, $.Cardinality.Many), null);

export type $CryptoHoldingλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "amount": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "change24h": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "symbol": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "value": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "<cryptoHoldings[is Analytics]": $.LinkDesc<$Analytics, $.Cardinality.Many, {}, false, false,  false, false>;
  "<cryptoHoldings": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $CryptoHolding = $.ObjectType<"default::CryptoHolding", $CryptoHoldingλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $CryptoHolding = $.makeType<$CryptoHolding>(_.spec, "a42b8756-e51c-11ef-b48b-b1df11b925b9", _.syntax.literal);

const CryptoHolding: $.$expr_PathNode<$.TypeSet<$CryptoHolding, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CryptoHolding, $.Cardinality.Many), null);

export type $DailyImpressionsλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "count": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, false>;
  "date": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "<dailyImpressions[is Analytics]": $.LinkDesc<$Analytics, $.Cardinality.Many, {}, false, false,  false, false>;
  "<dailyImpressions": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $DailyImpressions = $.ObjectType<"default::DailyImpressions", $DailyImpressionsλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $DailyImpressions = $.makeType<$DailyImpressions>(_.spec, "a42cc080-e51c-11ef-8c2f-67622266e1cf", _.syntax.literal);

const DailyImpressions: $.$expr_PathNode<$.TypeSet<$DailyImpressions, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($DailyImpressions, $.Cardinality.Many), null);

export type $DemographicsλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "age": $.PropertyDesc<$AgeGroup, $.Cardinality.One, false, false, false, false>;
  "percentage": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "<demographics[is Analytics]": $.LinkDesc<$Analytics, $.Cardinality.Many, {}, false, false,  false, false>;
  "<demographics": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Demographics = $.ObjectType<"default::Demographics", $DemographicsλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Demographics = $.makeType<$Demographics>(_.spec, "a42db0f8-e51c-11ef-98b8-f9ea1aa8622b", _.syntax.literal);

const Demographics: $.$expr_PathNode<$.TypeSet<$Demographics, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Demographics, $.Cardinality.Many), null);

export type $FetchedTweetλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "edit_history_tweet_ids": $.PropertyDesc<$.ArrayType<_std.$str>, $.Cardinality.One, false, false, false, false>;
  "text": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "timestamp": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, true>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "<fetchedTweets[is Twin]": $.LinkDesc<$Twin, $.Cardinality.Many, {}, false, false,  false, false>;
  "<fetchedTweets": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $FetchedTweet = $.ObjectType<"default::FetchedTweet", $FetchedTweetλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $FetchedTweet = $.makeType<$FetchedTweet>(_.spec, "a433934c-e51c-11ef-986e-d3ec74bc1af0", _.syntax.literal);

const FetchedTweet: $.$expr_PathNode<$.TypeSet<$FetchedTweet, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($FetchedTweet, $.Cardinality.Many), null);

export type $LikesλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "userId": $.PropertyDesc<$UserIdType, $.Cardinality.One, false, false, false, false>;
  "<likes[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<likes": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Likes = $.ObjectType<"default::Likes", $LikesλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Likes = $.makeType<$Likes>(_.spec, "75044e96-e5b1-11ef-ab8b-e7d45837b21d", _.syntax.literal);

const Likes: $.$expr_PathNode<$.TypeSet<$Likes, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Likes, $.Cardinality.Many), null);

export type $NotificationλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "kind": $.PropertyDesc<$NotificationGroup, $.Cardinality.One, false, false, false, false>;
  "message": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "timestamp": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, true>;
  "twinHandle": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "twitterHandle": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "<notifications[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<notifications": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Notification = $.ObjectType<"default::Notification", $NotificationλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Notification = $.makeType<$Notification>(_.spec, "a441dcea-e51c-11ef-8676-1db4f8a7b27a", _.syntax.literal);

const Notification: $.$expr_PathNode<$.TypeSet<$Notification, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Notification, $.Cardinality.Many), null);

export type $PeakHoursλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "engagement": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "hour": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "<peakHours[is Analytics]": $.LinkDesc<$Analytics, $.Cardinality.Many, {}, false, false,  false, false>;
  "<peakHours": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $PeakHours = $.ObjectType<"default::PeakHours", $PeakHoursλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $PeakHours = $.makeType<$PeakHours>(_.spec, "a42ea0ee-e51c-11ef-822c-896d277b0a66", _.syntax.literal);

const PeakHours: $.$expr_PathNode<$.TypeSet<$PeakHours, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($PeakHours, $.Cardinality.Many), null);

export type $ReachByPlatformλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "count": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, false>;
  "platform": $.PropertyDesc<$PlatformType, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "<reachByPlatform[is Analytics]": $.LinkDesc<$Analytics, $.Cardinality.Many, {}, false, false,  false, false>;
  "<reachByPlatform": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $ReachByPlatform = $.ObjectType<"default::ReachByPlatform", $ReachByPlatformλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $ReachByPlatform = $.makeType<$ReachByPlatform>(_.spec, "a42f8e64-e51c-11ef-a3c8-a7ce9ee967df", _.syntax.literal);

const ReachByPlatform: $.$expr_PathNode<$.TypeSet<$ReachByPlatform, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($ReachByPlatform, $.Cardinality.Many), null);

export type $RepliesλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "content": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "likes": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, false>;
  "timestamp": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "userId": $.PropertyDesc<$UserIdType, $.Cardinality.One, false, false, false, false>;
  "<replies[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<replies": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Replies = $.ObjectType<"default::Replies", $RepliesλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Replies = $.makeType<$Replies>(_.spec, "7505c0fa-e5b1-11ef-add4-1f4e4da0cfe2", _.syntax.literal);

const Replies: $.$expr_PathNode<$.TypeSet<$Replies, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Replies, $.Cardinality.Many), null);

export type $RetwineetsλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "userId": $.PropertyDesc<$UserIdType, $.Cardinality.One, false, false, false, false>;
  "<retwineets[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<retwineets": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Retwineets = $.ObjectType<"default::Retwineets", $RetwineetsλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Retwineets = $.makeType<$Retwineets>(_.spec, "75079f6a-e5b1-11ef-ace9-67559f2420ea", _.syntax.literal);

const Retwineets: $.$expr_PathNode<$.TypeSet<$Retwineets, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Retwineets, $.Cardinality.Many), null);

export type $TokenShareλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "availableShares": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, false>;
  "pricePerShare": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "totalShares": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "shareholders": $.LinkDesc<$UserTokenShare, $.Cardinality.AtLeastOne, {}, false, false,  false, false>;
  "<tokenShares[is Twin]": $.LinkDesc<$Twin, $.Cardinality.Many, {}, false, false,  false, false>;
  "<tokenShares[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<tokenShares": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $TokenShare = $.ObjectType<"default::TokenShare", $TokenShareλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $TokenShare = $.makeType<$TokenShare>(_.spec, "a435d08a-e51c-11ef-878a-656ee5170f99", _.syntax.literal);

const TokenShare: $.$expr_PathNode<$.TypeSet<$TokenShare, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($TokenShare, $.Cardinality.Many), null);

export type $TokenStatsλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "change24h": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "marketCap": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "price": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "volume24h": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "<tokenStats[is Twin]": $.LinkDesc<$Twin, $.Cardinality.Many, {}, false, false,  false, false>;
  "<tokenStats[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<tokenStats": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $TokenStats = $.ObjectType<"default::TokenStats", $TokenStatsλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $TokenStats = $.makeType<$TokenStats>(_.spec, "a437200c-e51c-11ef-9c6d-fd8d643b8244", _.syntax.literal);

const TokenStats: $.$expr_PathNode<$.TypeSet<$TokenStats, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($TokenStats, $.Cardinality.Many), null);

export type $TopInteractionsλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "count": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, false>;
  "kind": $.PropertyDesc<$InteractionGroup, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "<topInteractions[is Analytics]": $.LinkDesc<$Analytics, $.Cardinality.Many, {}, false, false,  false, false>;
  "<topInteractions": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $TopInteractions = $.ObjectType<"default::TopInteractions", $TopInteractionsλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $TopInteractions = $.makeType<$TopInteractions>(_.spec, "a4308bb6-e51c-11ef-bb32-074c21f2a7b8", _.syntax.literal);

const TopInteractions: $.$expr_PathNode<$.TypeSet<$TopInteractions, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($TopInteractions, $.Cardinality.Many), null);

export type $TransactionλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "kind": $.PropertyDesc<$TransactionGroup, $.Cardinality.One, false, false, false, false>;
  "pricePerShare": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "shares": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, false>;
  "timestamp": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, true>;
  "totalAmount": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "<transactions[is Twin]": $.LinkDesc<$Twin, $.Cardinality.Many, {}, false, false,  false, false>;
  "<transactions[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<transactions": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Transaction = $.ObjectType<"default::Transaction", $TransactionλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Transaction = $.makeType<$Transaction>(_.spec, "a438306e-e51c-11ef-aedf-5d9fd04c8455", _.syntax.literal);

const Transaction: $.$expr_PathNode<$.TypeSet<$Transaction, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Transaction, $.Cardinality.Many), null);

export type $TwinλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "modelData": $.PropertyDesc<_std.$json, $.Cardinality.One, false, false, false, false>;
  "isListed": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, false>;
  "autoReply": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, false>;
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, true>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "personality": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "price": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "profileImage": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "twinHandle": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, true, false, false, false>;
  "twitterHandle": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "userId": $.PropertyDesc<$UserIdType, $.Cardinality.One, false, false, false, true>;
  "analytics": $.LinkDesc<$Analytics, $.Cardinality.One, {}, false, false,  false, false>;
  "fetchedTweets": $.LinkDesc<$FetchedTweet, $.Cardinality.AtLeastOne, {}, false, false,  false, false>;
  "tokenShares": $.LinkDesc<$TokenShare, $.Cardinality.One, {}, false, false,  false, false>;
  "tokenStats": $.LinkDesc<$TokenStats, $.Cardinality.One, {}, false, false,  false, false>;
  "transactions": $.LinkDesc<$Transaction, $.Cardinality.AtLeastOne, {}, false, false,  false, false>;
  "stats": $.LinkDesc<$TwinStats, $.Cardinality.One, {}, false, false,  false, false>;
  "twineets": $.LinkDesc<$Twineet, $.Cardinality.AtLeastOne, {}, false, false,  false, false>;
  "verification": $.LinkDesc<$Verification, $.Cardinality.One, {}, false, false,  false, false>;
  "<twins[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<twins": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Twin = $.ObjectType<"default::Twin", $TwinλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {twinId: {__element__: $TwinIdType, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Twin = $.makeType<$Twin>(_.spec, "a43e7104-e51c-11ef-8e4d-c132a31f4b3b", _.syntax.literal);

const Twin: $.$expr_PathNode<$.TypeSet<$Twin, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Twin, $.Cardinality.Many), null);

export type $TwinStatsλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "interactions": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, false>;
  "replies": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "uptime": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "<stats[is Twin]": $.LinkDesc<$Twin, $.Cardinality.Many, {}, false, false,  false, false>;
  "<stats": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $TwinStats = $.ObjectType<"default::TwinStats", $TwinStatsλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $TwinStats = $.makeType<$TwinStats>(_.spec, "a4398068-e51c-11ef-a4a9-ef8538f2a2bd", _.syntax.literal);

const TwinStats: $.$expr_PathNode<$.TypeSet<$TwinStats, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($TwinStats, $.Cardinality.Many), null);

export type $TwineetλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "content": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "isLiked": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, true>;
  "isRetwineeted": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, true>;
  "likes": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, true>;
  "replies": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, true>;
  "retwineets": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, true>;
  "timestamp": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, true>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "<twineets[is Twin]": $.LinkDesc<$Twin, $.Cardinality.Many, {}, false, false,  false, false>;
  "<twineets": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Twineet = $.ObjectType<"default::Twineet", $TwineetλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Twineet = $.makeType<$Twineet>(_.spec, "a43a93cc-e51c-11ef-bd82-95e2112a9c91", _.syntax.literal);

const Twineet: $.$expr_PathNode<$.TypeSet<$Twineet, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Twineet, $.Cardinality.Many), null);

export type $UserλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, true>;
  "email": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "passwordHash": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "username": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "walletAddress": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "birthday": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "userId": $.PropertyDesc<$UserIdType, $.Cardinality.One, true, false, false, false>;
  "walletBalance": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, true>;
  "transactions": $.LinkDesc<$Transaction, $.Cardinality.Many, {}, false, false,  false, false>;
  "twins": $.LinkDesc<$Twin, $.Cardinality.Many, {}, false, false,  false, false>;
  "notifications": $.LinkDesc<$Notification, $.Cardinality.Many, {}, false, false,  false, false>;
  "tokenShares": $.LinkDesc<$TokenShare, $.Cardinality.Many, {}, false, false,  false, false>;
  "tokenStats": $.LinkDesc<$TokenStats, $.Cardinality.Many, {}, false, false,  false, false>;
  "userTokenShares": $.LinkDesc<$UserTokenShare, $.Cardinality.Many, {}, false, false,  false, false>;
  "likes": $.LinkDesc<$Likes, $.Cardinality.Many, {}, false, false,  false, false>;
  "replies": $.LinkDesc<$Replies, $.Cardinality.Many, {}, false, false,  false, false>;
  "retwineets": $.LinkDesc<$Retwineets, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $User = $.ObjectType<"default::User", $UserλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {username: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
  {email: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
  {userId: {__element__: $UserIdType, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $User = $.makeType<$User>(_.spec, "a4432988-e51c-11ef-974c-ff98e995d7df", _.syntax.literal);

const User: $.$expr_PathNode<$.TypeSet<$User, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null);

export type $UserTokenShareλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "purchaseDate": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, false>;
  "purchasePrice": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "shares": $.PropertyDesc<_std.$decimal, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "userId": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "<shareholders[is TokenShare]": $.LinkDesc<$TokenShare, $.Cardinality.Many, {}, false, false,  false, false>;
  "<userTokenShares[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<shareholders": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<userTokenShares": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $UserTokenShare = $.ObjectType<"default::UserTokenShare", $UserTokenShareλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $UserTokenShare = $.makeType<$UserTokenShare>(_.spec, "a434c96a-e51c-11ef-95f0-3d49cb89a51d", _.syntax.literal);

const UserTokenShare: $.$expr_PathNode<$.TypeSet<$UserTokenShare, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($UserTokenShare, $.Cardinality.Many), null);

export type $VerificationλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "isVerified": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, false>;
  "twinId": $.PropertyDesc<$TwinIdType, $.Cardinality.One, false, false, false, false>;
  "verificationDate": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, false>;
  "<verification[is Twin]": $.LinkDesc<$Twin, $.Cardinality.Many, {}, false, false,  false, false>;
  "<verification": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Verification = $.ObjectType<"default::Verification", $VerificationλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Verification = $.makeType<$Verification>(_.spec, "a43d602a-e51c-11ef-a13a-912b17a9af80", _.syntax.literal);

const Verification: $.$expr_PathNode<$.TypeSet<$Verification, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Verification, $.Cardinality.Many), null);



export { AgeGroup, InteractionGroup, NotificationGroup, PlatformType, TransactionGroup, TwinIdType, UserIdType, $Analytics, Analytics, $CryptoHolding, CryptoHolding, $DailyImpressions, DailyImpressions, $Demographics, Demographics, $FetchedTweet, FetchedTweet, $Likes, Likes, $Notification, Notification, $PeakHours, PeakHours, $ReachByPlatform, ReachByPlatform, $Replies, Replies, $Retwineets, Retwineets, $TokenShare, TokenShare, $TokenStats, TokenStats, $TopInteractions, TopInteractions, $Transaction, Transaction, $Twin, Twin, $TwinStats, TwinStats, $Twineet, Twineet, $User, User, $UserTokenShare, UserTokenShare, $Verification, Verification };

type __defaultExports = {
  "AgeGroup": typeof AgeGroup;
  "InteractionGroup": typeof InteractionGroup;
  "NotificationGroup": typeof NotificationGroup;
  "PlatformType": typeof PlatformType;
  "TransactionGroup": typeof TransactionGroup;
  "TwinIdType": typeof TwinIdType;
  "UserIdType": typeof UserIdType;
  "Analytics": typeof Analytics;
  "CryptoHolding": typeof CryptoHolding;
  "DailyImpressions": typeof DailyImpressions;
  "Demographics": typeof Demographics;
  "FetchedTweet": typeof FetchedTweet;
  "Likes": typeof Likes;
  "Notification": typeof Notification;
  "PeakHours": typeof PeakHours;
  "ReachByPlatform": typeof ReachByPlatform;
  "Replies": typeof Replies;
  "Retwineets": typeof Retwineets;
  "TokenShare": typeof TokenShare;
  "TokenStats": typeof TokenStats;
  "TopInteractions": typeof TopInteractions;
  "Transaction": typeof Transaction;
  "Twin": typeof Twin;
  "TwinStats": typeof TwinStats;
  "Twineet": typeof Twineet;
  "User": typeof User;
  "UserTokenShare": typeof UserTokenShare;
  "Verification": typeof Verification
};
const __defaultExports: __defaultExports = {
  "AgeGroup": AgeGroup,
  "InteractionGroup": InteractionGroup,
  "NotificationGroup": NotificationGroup,
  "PlatformType": PlatformType,
  "TransactionGroup": TransactionGroup,
  "TwinIdType": TwinIdType,
  "UserIdType": UserIdType,
  "Analytics": Analytics,
  "CryptoHolding": CryptoHolding,
  "DailyImpressions": DailyImpressions,
  "Demographics": Demographics,
  "FetchedTweet": FetchedTweet,
  "Likes": Likes,
  "Notification": Notification,
  "PeakHours": PeakHours,
  "ReachByPlatform": ReachByPlatform,
  "Replies": Replies,
  "Retwineets": Retwineets,
  "TokenShare": TokenShare,
  "TokenStats": TokenStats,
  "TopInteractions": TopInteractions,
  "Transaction": Transaction,
  "Twin": Twin,
  "TwinStats": TwinStats,
  "Twineet": Twineet,
  "User": User,
  "UserTokenShare": UserTokenShare,
  "Verification": Verification
};
export default __defaultExports;
