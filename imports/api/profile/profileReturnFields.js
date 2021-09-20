export const profileReturnFields = (userId) => {
    return {
        profile: 1,
        viewId: 1,
        reputationScore: 1,
        invitedBy: 1,
        invited: 1,
        followedUsers: 1,
        followedTopics: 1,
        followedByCount: {$size: "$followedBy"},
        followingCount: {$size: "$followedUsers"},
        followed: {$in: [userId, "$followedBy"]},
        shareCount: {$size: "$sharedBy"},
        ostracizeCount: {$size: "$ostracizedBy"},
        ostracized: {$in: [userId, "$ostracizedBy"]}
    };
};
