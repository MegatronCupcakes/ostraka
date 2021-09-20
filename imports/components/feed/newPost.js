import React from 'react';
import PropTypes from 'prop-types';

import PreviewContainer from './previewContainer';
import AttachImageContainer from './attachImageContainer';
import AttachVideoContainer from './attachVideoContainer';

const NewPost = (props) => {
    let _newPost;
    let _noninteractive = props.postType === 'text' && props.post.length < 1 ? (
        <div style={{textAlign: "center", marginTop: "4rem", marginBottom: "4rem"}}>
            <div className="text-muted">post preview</div>
        </div>
    ) : (
        <PreviewContainer
            post={props.post}
            postType={props.postType}
            postUrl={props.postUrl}
            postMentions={props.postMentions}
            postTags={props.postTags}
            postImages={props.postImages}
            navStack={props.navStack}
        />
    );
    if(props.isPosting){
        _newPost = (
            <div style={{width: "100%", backgroundColor: "#f8f9fa"}}>
                <div className="col-xs-12 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 mb-3 ma-3">
                    <div className="fade-in">
                        <div className="mb-3 input-group" style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                            <div className="col">
                                <div style={{width: "100%", paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
                                    {props.postErrors}
                                    <textarea rows="5" className="form-control me-2" placeholder="share something..." aria-label="share something" onChange={props.setPost} />
                                </div>
                                <div className="row" style={{paddingBottom: "2rem"}}>
                                    <div className="col align-self-start">
                                        <div className={props.imageButtonClass} data-bs-toggle="modal" data-bs-target="#attachImageModal"><i className="bi bi-image"></i></div>
                                        <div className={props.videoButtonClass} style={{marginLeft: "0.5rem"}} data-bs-toggle="modal" data-bs-target="#attachVideoModal"><i className="bi bi-camera-video"></i></div>
                                    </div>
                                    <div className="col align-self-end" style={{textAlign: "right"}}>
                                        <div className={props.deleteButtonClass} onClick={props.handleDelete}><i className="bi bi-x-lg"></i></div>
                                        <div className={props.postButtonClass} style={{marginLeft: "0.5rem"}} onClick={props.handlePost}><i className="bi bi-chat-square-quote"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-7" style={{backgroundColor: "white", marginBottom: "1rem", marginLeft: "1rem", marginTop: "0.5rem"}}>
                                <div style={{margin: "0.5rem"}}>
                                    {_noninteractive}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="attachImageModal" tabIndex="-1" aria-labelledby="attachImageModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <AttachImageContainer
                                postImages={props.postImages}
                                setPostImages={props.setPostImages}
                                setPostType={props.setPostType}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="attachVideoModal" tabIndex="-1" aria-labelledby="attachVideoModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <AttachVideoContainer
                                postVideo={props.postVideo}
                                setPostVideo={props.setPostVideo}
                                setPostType={props.setPostType}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        _newPost = (
            <div className="col-xs-12 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 mb-3 ma-3">
                <div className="mb-3 input-group fade-out" style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                    <input className="form-control me-2" placeholder="share something..." aria-label="share something" onFocus={props.postFocus} />
                    <div className={props.postButtonClass} onClick={props.postFocus}><i className="bi bi-chat-square-quote"></i></div>
                </div>
            </div>
        )
    }
    return _newPost;

};
NewPost.propTypes = {
    post: PropTypes.string,
    setPost: PropTypes.func.isRequired,
    postType: PropTypes.string.isRequired,
    setPostType: PropTypes.func.isRequired,
    postUrl: PropTypes.string,
    postMentions: PropTypes.array.isRequired,
    postTags: PropTypes.array.isRequired,
    postImages: PropTypes.array.isRequired,
    setPostImages: PropTypes.func.isRequired,
    postVideo: PropTypes.string,
    setPostVideo: PropTypes.func.isRequired,
    isPosting: PropTypes.bool.isRequired,
    setIsPosting: PropTypes.func.isRequired,
    postFocus: PropTypes.func.isRequired,
    imageButtonClass: PropTypes.string.isRequired,
    videoButtonClass: PropTypes.string.isRequired,
    postButtonClass: PropTypes.string.isRequired,
    deleteButtonClass: PropTypes.string.isRequired,
    handlePost: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    postErrors: PropTypes.array.isRequired,
    navStack: PropTypes.object.isRequired
};
export default NewPost;
