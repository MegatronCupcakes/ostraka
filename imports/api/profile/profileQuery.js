import {gql} from '@apollo/client';

export const ProfileFields = gql`
    fragment ProfileFields on User {
        _id
        viewId
        profile {
            firstName
            lastName
            profileTag
            profileImage
            invitedBy
            invited
            followedUsers
            followedTopics {
                _id
                tag
                createdAt
                updatedAt
            }
            reputationScore
        }
    }
`;

export const ProfileQuery = gql`
    ${ProfileFields}
    query GetProfile($_id: String) {
        getProfile(_id: $_id) {
            ...ProfileFields
        }
    }
`;

export const MultipleProfilesQuery = gql`
    ${ProfileFields}
    query GetProfiles($userIds: [String]) {
        getProfiles(userIds: $userIds) {
            ...ProfileFields
        }
    }
`;

export const TrendingProfilesQuery = gql`
    ${ProfileFields}
    query GetTrendingProfiles($limit: Int, $span: String) {
        getTrendingProfiles(limit: $limit, span: $span) {
            ...ProfileFields
        }
    }
`;

export default ProfileQuery;
