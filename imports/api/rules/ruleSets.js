import HistoryCollection from '/imports/api/history/historyCollection';

const RuleSets = [
    {
        version: 1.0,
        triggers: {
            like: (userId, postedById, type) => {
                return new Promise((resolve, reject) => {
                    try {
                        resolve();
                    } catch(error){
                        reject(error);
                    }
                });
            },
            dislike: (userId, postedById, type) => {
                return new Promise((resolve, reject) => {
                    try {
                        resolve();
                    } catch(error){
                        reject(error);
                    }
                });
            },
            follow: (userId, followedUserId) => {
                return new Promise((resolve, reject) => {
                    try {
                        resolve();
                    } catch(error){
                        reject(error);
                    }
                });
            },
            unfollow: (userId, followedUserId) => {
                return new Promise((resolve, reject) => {
                    try {
                        resolve();
                    } catch(error){
                        reject(error);
                    }
                });
            },
            share: (userId, followedUserId) => {
                return new Promise((resolve, reject) => {
                    try {
                        resolve();
                    } catch(error){
                        reject(error);
                    }
                });
            },
            ostracize: (userId, ostracizedUserId) => {
                return new Promise((resolve, reject) => {
                    try {
                        resolve();
                    } catch(error){
                        reject(error);
                    }
                });
            }
        }
    }
]
