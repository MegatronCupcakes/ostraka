import _ from 'underscore';

const _makeData = (count, seed) => {
    const _data = [];
    _.times(count, (n) =>{
        if(_.isString(seed)){
            _data.push(seed + '_' + (n + 1));
        }
        if(_.isArray(seed)){
            let _object = {};
            seed.forEach((key) => {
                if(_.isString(key)){
                    _object[key] = key + "_" + (n + 1);
                } else if(_.isObject(seed)){
                    _.extend(_object, key);
                }
            });
            _data.push(_object);
        }
    });
    return _data;
};

const _tags = _makeData(8, 'tag')
const _mentions = _makeData(6, 'mention');
const _likes = _makeData(7, 'like');
const _dislikes = _makeData(9, 'dislike');
const _comments = _makeData(15, ['commentId', 'user', 'comment', {likes: _likes}, {dislikes: _dislikes}]);

const _devContent = [
    {
        postedByTag: "galacticwidgets",
        postedBy: "Dallas Howard",
        postedById: "JzzE7goHv6PhqNbJY",
        postedByProfilePic: window.location.href + "images/evil_thoughts_kitten.jpg",
        type: "image",
        images: ["https://galacticwidgets.no-ip.biz:8190/user_images/JzzE7goHv6PhqNbJY/prqWNEut4dCtAaGvN.jpeg", "https://galacticwidgets.no-ip.biz:8190/user_images/JzzE7goHv6PhqNbJY/aCn5niQrjB9CyJkkb.jpeg", "https://galacticwidgets.no-ip.biz:8190/user_images/JzzE7goHv6PhqNbJY/2Yaw9Y63pumGpsou6.png"],
        caption: "I've always loved this picture.  This was taken during my junior year in college when the family came to visit me in London.",
        tags: _tags,
        mentions: _mentions,
        likes: _likes,
        dislikes: _dislikes,
        comments: _comments
    },
    {
        postedByTag: "galacticwidgets",
        postedBy: "Dallas Howard",
        postedById: "JzzE7goHv6PhqNbJY",
        postedByProfilePic: window.location.href + "images/evil_thoughts_kitten.jpg",
        type: "link",
        url: "https://twitter.com/4adfan/status/1417508450959908869",
        caption: "Too funny!",
        tags: _tags,
        mentions: _mentions,
        likes: _likes,
        dislikes: _dislikes,
        comments: _comments
    },
    {
        postedByTag: "galacticwidgets",
        postedBy: "Dallas Howard",
        postedById: "JzzE7goHv6PhqNbJY",
        postedByProfilePic: window.location.href + "images/evil_thoughts_kitten.jpg",
        type: "image",
        images: ["https://wallup.net/wp-content/uploads/2015/06/Goldish-cat-smiles-748x522.jpg", "https://www.adamsdrafting.com/wp/wp-content/uploads/2018/06/More-Grumpy-Cat.jpg", "https://mymodernmet.com/wp/wp-content/uploads/2017/03/gabrielius-khiterer-stray-cats-11.jpg"],
        caption: "Happy Kitty!",
        tags: _tags,
        mentions: _mentions,
        likes: _likes,
        dislikes: _dislikes,
        comments: _comments
    },
    {
        postedByTag: "galacticwidgets",
        postedBy: "Dallas Howard",
        postedById: "JzzE7goHv6PhqNbJY",
        postedByProfilePic: window.location.href + "images/evil_thoughts_kitten.jpg",
        type: "link",
        url: "https://www.nbcnews.com/news/latino/final-destination-many-worlds-refugees-mexico-new-home-rcna1316",
        caption: "Check out this story from an legitimate news source",
        tags: _tags,
        mentions: _mentions,
        likes: _likes,
        dislikes: _dislikes,
        comments: _comments
    },
    {
        postedByTag: "galacticwidgets",
        postedBy: "Dallas Howard",
        postedById: "JzzE7goHv6PhqNbJY",
        postedByProfilePic: window.location.href + "images/evil_thoughts_kitten.jpg",
        type: "text",
        caption: "If I could be any animal in the world, I'd be a human.",
        tags: _tags,
        mentions: _mentions,
        likes: _likes,
        dislikes: _dislikes,
        comments: _comments
    },
    {
        postedByTag: "galacticwidgets",
        postedBy: "Dallas Howard",
        postedById: "JzzE7goHv6PhqNbJY",
        postedByProfilePic: window.location.href + "images/evil_thoughts_kitten.jpg",
        type: "video",
        url: "https://www.youtube.com/watch?v=4wyOy3ws8cY",
        caption: "Bill Bailey doing some killer standup!",
        tags: _tags,
        mentions: _mentions,
        likes: _likes,
        dislikes: _dislikes,
        comments: _comments
    },
    {
        postedByTag: "galacticwidgets",
        postedBy: "Dallas Howard",
        postedById: "JzzE7goHv6PhqNbJY",
        postedByProfilePic: window.location.href + "images/evil_thoughts_kitten.jpg",
        type: "link",
        url: "https://www.engadget.com/google-wear-os-update-apps-103556477.html",
        caption: "Finally WearOS is getting useful updates",
        tags: _tags,
        mentions: _mentions,
        likes: _likes,
        dislikes: _dislikes,
        comments: _comments
    }
];

export const devContent = _devContent.map((post, index) => {
    post._id = "post_" + (index + 1);
    return post;
});
