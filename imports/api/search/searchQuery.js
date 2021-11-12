import {gql} from '@apollo/client';
import {PostFields} from '/imports/api/post/postQuery';
import {TagFields} from '/imports/api/tag/tagQuery';
import {ProfileFields} from '/imports/api/profile/profileQuery';
import {CommentFields} from '/imports/api/comments/commentQuery';

export const SearchQuery = gql`
    ${PostFields}
    ${TagFields}
    ${CommentFields}
    ${ProfileFields}
    query SearchSite($query: String) {
        searchSite(query: $query) {
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
