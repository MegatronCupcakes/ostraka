const _infiniteScroll = (existing, incoming, {args: {offset = 0}}) => {
    const merged = existing ? existing.slice(0) : [];
    for (let i = 0; i < incoming.length; ++i) {
        merged[offset + i] = incoming[i];
    }
    return merged;
}

export const typePolicies = {
    Query: {
        fields: {
            getMessagesIndicator: {
                merge: false
            },
            getMessages: {
                merge: false
            },
            getNotifications: {
                merge: false
            },
            getNotificationsForIndicator: {
                merge: false
            },
            getPosts: {
                keyArgs: [],
                merge: _infiniteScroll
            },
            getUserPosts: {
                keyArgs: ['postedById'],
                merge: _infiniteScroll
            },
            getComments: {
                keyArgs: ['parentId'],
                merge: _infiniteScroll
            },
            getUserComments: {
                keyArgs: ['postedById'],
                merge: _infiniteScroll
            },
            getProfiles: {
                keyArgs: ['userIds'],
                merge: _infiniteScroll
            },
            getTopic: {
                keyArgs: ['tagId'],
                merge: _infiniteScroll
            },
            searchSite: {
                keyArgs: [],
                merge(existing, incoming, {args: {offset = 0}}) {
                    return incoming;
                }
            }
        }
    }
};
