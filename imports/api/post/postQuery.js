import {gql} from '@apollo/client';

export const PostFields = gql`
    fragment PostFields on Post {
        _id
        viewId
        postedByTag
        postedBy
        postedById
        postedByProfilePic
        type
        images
        url
        caption
        tags
        tagIds
        mentions
        mentionIds
        comments
        likeCount
        dislikeCount
        shareCount
        liked
        disliked
        shared
        sharedContentId
        sharedById
        createdAt
    }
`;

export const PostQuery = gql`
    ${PostFields}
    query GetPosts {
        getPosts {
            ...PostFields
        }
    }
`;

export const GetPostById = gql`
    ${PostFields}
    query GetPost($_id: String) {
        getPost(_id: $_id) {
            ...PostFields
        }
    }
`;

export const TaggedPostsQuery = gql`
    ${PostFields}
    query GetTaggedPosts($tagId: String) {
        getTaggedPosts(tagId: $tagId) {
            ...PostFields
        }
    }
`;

export const UserPostsQuery = gql`
    ${PostFields}
    query GetUserPosts($postedById: String) {
        getUserPosts(postedById: $postedById) {
            ...PostFields
        }
    }
`;

export default PostQuery;
