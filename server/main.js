import { Meteor } from 'meteor/meteor';
import { PostCollection } from '/imports/api/post/postCollection';
import './apollo'

import '../imports/api/account/accountServer';
import '../imports/api/routes/routes';
import '../imports/api/feed/feedProxy';
import '../imports/api/post/createPost';
import '../imports/api/images/uploadImages';
import '../imports/api/video/uploadVideo';
