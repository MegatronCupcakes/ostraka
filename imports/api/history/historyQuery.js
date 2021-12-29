import {gql} from '@apollo/client';

export const HistoryFields = gql`
    fragment HistoryFields on History {
        _id
        userId
        trigger {
            action
            actingUserId
            actingUserName
            actingUserTag
            targetUserId
            targetUserName
            targetUserTag
            targetContentId
            targetContentType
            dependentRelationship {
                userId
                userTag
                userName
                sequenceNumber
            }
        }
        description
        appliedValue
        ruleSet
        active
        createdAt
    }
`;

export const HistoryQuery = gql`
    ${HistoryFields}
    query GetUserHistory($userId: String, $offset: Int) {
        getUserHistory(userId: $userId, offset: $offset) {
            count
            results {
                ...HistoryFields
            }
            pageSize
        }
    }
`;
