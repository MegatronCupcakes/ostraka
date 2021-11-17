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
                merge(existing, incoming, {args: {offset = 0}}) {
                    // Slicing is necessary because the existing data is
                    // immutable, and frozen in development.
                    const merged = existing ? existing.slice(0) : [];
                    for (let i = 0; i < incoming.length; ++i) {
                        merged[offset + i] = incoming[i];
                    }
                    return merged;
                }
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
