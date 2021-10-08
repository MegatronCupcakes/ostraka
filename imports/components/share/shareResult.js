import React from 'react';
import PropTypes from 'prop-types';
import PostView from '/imports/components/feed/postView';

const ShareResult = (props) => {
    switch(props.result.shareType){
        case "embed":
            return (
                <EmbedResult
                    dataUrl={props.result.dataUrl}
                    scriptUrl={props.result.scriptUrl}
                />
            );
        case "link":
            return (
                <LinkResult link={props.result.link} />
            );
        case "ostraka":
            return (
                <OstrakaResult
                    post={props.result.post}
                    navStack={props.navStack}
                />
            );
        default:
            return (<></>);
    }
};
ShareResult.propTypes = {
    result: PropTypes.object.isRequired,
    navStack: PropTypes.object.isRequired
};
export default ShareResult;


const EmbedResult = (props) => {
    const embedCode = `<div data-url="${props.dataUrl}"><script src="${props.scriptUrl}"></script></div>`;
    const copyEmbed = async () => {
        await navigator.clipboard.writeText(embedCode);
    }
    return (
        <div className="row shareResult">
            <div className="col-1 shareResultHeader">
                <i className="bi bi-code-slash"></i>
            </div>
            <div className="col-11">
                <div className="btn btn-sm btn-primary clipBoard" onClick={copyEmbed}><i className="bi bi-clipboard"></i></div>
                <div className="codeView">
                    <pre><code>{embedCode}</code></pre>
                </div>
            </div>
        </div>
    );
};
EmbedResult.propTypes = {
    dataUrl: PropTypes.string.isRequired,
    scriptUrl: PropTypes.string.isRequired
};

const LinkResult = (props) => {
    const copyLink = async () => {
        await navigator.clipboard.writeText(props.link);
    }
    return (
        <div className="row shareResult">
            <div className="col-1 shareResultHeader">
                <i className="bi bi-link"></i>
            </div>
            <div className="col-11">
                <div className="btn btn-sm btn-primary clipBoard" onClick={copyLink}><i className="bi bi-clipboard"></i></div>
                <div className="codeView">
                    <pre><code>{props.link}</code></pre>
                </div>
            </div>
        </div>
    )
};
LinkResult.propTypes = {
    link: PropTypes.string.isRequired
};

const OstrakaResult = (props) => {
    return (
        <div className="row shareResult">
            <div className="col-1 shareResultHeader">
                <i className="bi bi-ostraka">o</i>
            </div>
            <div className="col-11">
                <PostView
                    noninteractive={true}
                    displaySize="small"
                    post={props.post}
                    navStack={props.navStack}
                />
            </div>
        </div>
    )
};
OstrakaResult.propTypes = {
    post: PropTypes.object.isRequired,
    navStack: PropTypes.object.isRequired
};
