import {gql} from '@apollo/client';

export const TagFields = gql`
    fragment TagFields on Tag {
        _id
        viewId
        tag
        createdAt
    }
`;

export const TrendingTopicsQuery = gql`
    ${TagFields}
    query GetTrendingTopics {
        getTrendingTopics {
            ...TagFields
        }
    }
`;
