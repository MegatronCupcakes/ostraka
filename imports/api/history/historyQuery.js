import {gql} from '@apollo/client';

export const HistoryFields = gql`
    fragment HistoryFields on History {
        _id
        userId
        trigger {
            action
            dependentUser
            dependentRelationship {
                userId
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
    query GetUserHistory {
        getUserHistory {
            ...HistoryFields
        }
    }
`;
