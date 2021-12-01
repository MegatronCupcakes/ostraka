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
    query GetComments($parentId: String, $offset: Int) {
        getComments(parentId: $parentId, offset: $offset) {
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
    query GetUserComments($postedById: String, $offset: Int) {
        getUserComments(postedById: $postedById, offset: $offset) {
            ...CommentFields
        }
    }
`;

export const CommentByIdQuery = gql`
    ${CommentFields}
    query GetCommentById($_id: String) {
        getCommentById(_id: $_id) {
            ...CommentFields
        }
    }
`;

export default CommentQuery;
