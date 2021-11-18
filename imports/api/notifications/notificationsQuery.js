import {gql} from '@apollo/client';

export const NotificationFields = gql`
    fragment NotificationFields on Notification {
        _id
        viewId
        userId
        subject
        body
        navTo {
            navState
            viewContent
            activeTag {
                _id
                viewId
                tag
                usage
                createdBy
                usedBy
                sharedBy
                createdAt
                active
            }
        }
        active
        read
        notify
        createdAt
    }
`;

export const NotificationsIndicatorQuery = gql`
    ${NotificationFields}
    query GetNotificationForIndicator {
        getNotificationsForIndicator {
            count
            notifications {
                ...NotificationFields
            }
            pageSize
        }
    }
`;

export const NotificationsQuery = gql`
    ${NotificationFields}
    query GetNotifications($offset: Int) {
        getNotifications(offset: $offset) {
            count
            notifications {
                ...NotificationFields
            }
            pageSize
        }
    }
`;
