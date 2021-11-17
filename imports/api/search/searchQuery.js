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
    query SearchSite($query: String, $tagOffset: Int, $postOffset: Int, $commentOffset: Int, $userOffset: Int) {
        searchSite(query: $query, tagOffset: $tagOffset, postOffset: $postOffset, commentOffset: $commentOffset, userOffset: $userOffset) {
            ... on SearchResults {
                Post {
                    count
                    results {
                        __typename
                        ... on Post {
                            ...PostFields
                        }
                    }
                    pageSize
                }
                Tag {
                    count
                    results {
                        __typename
                        ... on Tag {
                            ...TagFields
                        }
                    }
                    pageSize
                }
                Comment {
                    count
                    results {
                        __typename
                        ... on Comment {
                            ...CommentFields
                        }
                    }
                    pageSize
                }
                User {
                    count
                    results {
                        __typename
                        ... on User {
                            ...ProfileFields
                        }
                    }
                    pageSize
                }
            }
        }
    }
`;
