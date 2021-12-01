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
            location
        }
        invitedBy
        invited
        followedUsers
        followed
        followedTopics {
            _id
            tag
            createdAt
            updatedAt
        }
        reputationScore
        followedByCount
        shareCount
        ostracizeCount
        ostracized
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
    query GetProfiles($userIds: [String], $offset: Int) {
        getProfiles(userIds: $userIds, offset: $offset) {
            ...ProfileFields
        }
    }
`;

export const TrendingProfilesQuery = gql`
    ${ProfileFields}
    query GetTrendingProfiles {
        getTrendingProfiles {
            ...ProfileFields
        }
    }
`;

export default ProfileQuery;
