import React from 'react';
import _ from 'underscore';
/*

Post types:
text - simple text posting.
image - user posted image
video - user posted video
link - user shared third party content

*/
const AnalyzeNewPost = (postString) => {
    let type = "text";
    let cleanPost = postString;
    let url = null;
    let mentions = [];
    let tags = [];
    let errors = [];
    let _postStringArray = _.flatten(postString.toLowerCase().split("\n").map((_string) => {
        return _string.split(" ");
    }));
    _postStringArray.forEach((string) => {
        if(string.includes('http://') || string.includes('https://')){
            // content is Link
            if(url) errors.push("1 url at a time, pretty please")
            url = string;
            type = "link";
        }
        if(string.length > 1 && string.startsWith('@')){
            mentions.push(string);
        }
        if(string.length > 1 && string.startsWith('#')){
            tags.push(string);
        }
    });
    if(url){
        cleanPost = cleanPost.replace(url, "");
    }
    return [type, url, _clean(mentions), _clean(tags), cleanPost, _.uniq(errors)];
};
export default AnalyzeNewPost;

const _clean = (_array) => {
    return _array.map((string) => {
        return string.substring(1);
    });
};
