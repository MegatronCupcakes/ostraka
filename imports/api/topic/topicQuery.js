import {gql} from '@apollo/client';
import {PostFields} from '/imports/api/post/postQuery';
import {CommentFields} from '/imports/api/comments/commentQuery';

export const TopicQuery = gql`
    ${PostFields}
    ${CommentFields}
    query GetTopic($tagId: String, $offset: Int) {
        getTopic(tagId: $tagId, offset: $offset) {
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
