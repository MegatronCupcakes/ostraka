import {gql} from '@apollo/client';
import {PostFields} from '/imports/api/post/postQuery';
import {CommentFields} from '/imports/api/comments/commentQuery';

export const TopicQuery = gql`
    ${PostFields}
    ${CommentFields}
    query GetTopic($tagId: String) {
        getTopic(tagId: $tagId) {
            __typename
            ... on Post {
                ...PostFields
            }
            ... on Comment {
                ...CommentFields
            }
        }
    }
`;

export const TrendingTopicsQuery = gql`
    ${PostFields}
    ${CommentFields}
    query GetTrendingTopics($limit: Int, $span: String) {
        getTrendingTopics(limit: $limit, span: $span) {
            __typename
            ... on Post {
                ...PostFields
            }
            ... on Comment {
                ...CommentFields
            }
        }
    }
`;
