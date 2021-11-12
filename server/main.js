import './apollo';
import '/imports/api/account/userCollection';
import '/imports/api/errorLogger/serverMethod';
import '/imports/api/account/accountServer';
import '/imports/api/routes/routes';
import '/imports/api/feed/feedProxy';
import '/imports/api/post/createPost';
import '/imports/api/likes/like';
import '/imports/api/profile/followUser';
import '/imports/api/comments/comment'
import '/imports/api/images/uploadImages';
import '/imports/api/video/uploadVideo';
import '/imports/api/settings/settings';
import '/imports/api/share/server/share';
import '/imports/api/messaging/messaging';
import '/imports/api/notifications/notifications';
import '/imports/api/profile/ostracize';


import {seedTestData} from '/tests/test_data_factory';
if(process.env.SEED || process.env.SEED == "true"){
    console.log("seeding test data....");
    seedTestData();
}
