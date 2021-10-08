import {gql} from '@apollo/client';

export const CommentFields = gql`
    fragment CommentFields on Comment {
        _id
        parentId
        userId
        postedByTag
        postedBy
        postedById
        postedByProfilePic
        comment
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
        createdAt
    }
`;

const CommentQuery = gql`
    ${CommentFields}
    query GetComments($parentId: String) {
        getComments(parentId: $parentId) {
            ...CommentFields
        }
    }
`;

export const TaggedCommentsQuery = gql`
    ${CommentFields}
    query GetTaggedComments($tagId: String) {
        getTaggedComments(tagId: $tagId) {
            ...CommentFields
        }
    }
`;

export const UserCommentsQuery = gql`
    ${CommentFields}
    query GetUserComments($postedById: String) {
        getUserComments(postedById: $postedById) {
            ...CommentFields
        }
    }
`;

export default CommentQuery;
