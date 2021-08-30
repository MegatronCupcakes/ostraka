// Share and Comment Modals both contain links to tags and mentions in their caption view.
// When clicked, the modal needs to be dismissed.
export const dismissModals = () => {
    const buttons = document.getElementsByClassName('dismissModal');
    for (let i = 0; i < buttons.length; i++){
        buttons[i].click();
    };
};
