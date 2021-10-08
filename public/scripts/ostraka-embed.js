const scriptTag = document.scripts[document.scripts.length - 1];
const parentTag = scriptTag.parentNode;
const viewString = parentTag.dataset.url.substr(parentTag.dataset.url.indexOf("?") + 1);
const frameId = viewString.split("&")[0] + viewString.split("&")[1];
// add iframe resizing
window.onmessage = (e) => {
    console.log("window onmessage!", e.data);
    if (e.data.frameId === frameId && e.data.hasOwnProperty("frameHeight")) {
        document.getElementById(frameId).style.height = `${e.data.frameHeight + 50}px`;
    }
};
// append iframe.
parentTag.insertAdjacentHTML('afterend', `<iframe
    id="${frameId}"
    src="${parentTag.dataset.url}"
    width=600
    style="border: 1px solid #bbc1c7!important; borderRadius: 0.3rem;"
></iframe>`);
