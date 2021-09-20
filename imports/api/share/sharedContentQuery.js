import {gql} from '@apollo/client';
import {PostFields} from '/imports/api/post/postQuery';
import {TagFields} from '/imports/api/tag/tagQuery';
import {ProfileFields} from '/imports/api/profile/profileQuery';
import {CommentFields} from '/imports/api/comments/commentQuery';

export const SharedContentQuery = gql`
    ${PostFields}
    ${TagFields}
    ${CommentFields}
    ${ProfileFields}
    query GetSharedContent($viewId: String, $sharedById: String) {
        getSharedContent(viewId: $viewId, sharedById: $sharedById) {
            __typename
            ... on Post {
                ...PostFields
            }
            ... on Tag {
                ...TagFields
            }
            ... on Comment {
                ...CommentFields
            }
            ... on User {
                ...ProfileFields
            }
        }
    }
`;
