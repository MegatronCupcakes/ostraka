import {gql} from '@apollo/client';

export const TagFields = gql`
    fragment TagFields on Tag {
        _id
        viewId
        tag
        usage
        createdBy
        usedBy
        sharedBy
        createdAt
        active
    }
`;

export const TrendingTopicQuery = gql`
    ${TagFields}
    query GetTrendingTopics($limit: Int, $span: String) {
        getTrendingTopics(limit: $limit, span: $span) {
            ...TagFields
        }
    }
`;
