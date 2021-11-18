import {gql} from '@apollo/client';

export const MessageIndicatorFields = gql`
    fragment MessageIndicatorFields on Message {
        _id
        subject
        fromId
        fromName
        fromTag
        fromImage
        active
        read
        notify
        createdAt
    }
`;
export const MessageFields = gql`
    fragment MessageFields on Message {
        _id
        viewId
        toId
        subject
        body
        fromId
        fromViewId
        fromName
        fromTag
        fromImage
        active
        read
        notify
        createdAt
    }
`;

export const MessageIndicatorQuery = gql`
    ${MessageIndicatorFields}
    query GetMessagesForIndicator {
        getMessagesIndicator {
            count
            messages {
                ...MessageIndicatorFields
            }
            pageSize
        }
    }
`;

export const MessageQuery = gql`
    ${MessageFields}
    query GetMessages($query: String, $offset: Int) {
        getMessages(query: $query, offset: $offset) {
            count
            messages {
                ...MessageFields
            }
            pageSize
        }
    }
`;
