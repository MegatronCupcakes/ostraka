import {gql} from '@apollo/client';
import {PostFields} from '/imports/api/post/postQuery';
import {TagFields} from '/imports/api/tag/tagQuery';
import {ProfileFields} from '/imports/api/profile/profileQuery';

export const SharedContentQuery = gql`
    ${PostFields}
    ${TagFields}
    ${ProfileFields}
    query GetSharedContent($viewId: String) {
        getSharedContent(viewId: $viewId) {
            __typename
            ... on Post {
                ...PostFields
            }
            ... on Tag {
                ...TagFields
            }
            ... on User {
                ...ProfileFields
            }
        }
    }
`;
