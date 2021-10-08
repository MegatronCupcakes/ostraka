export const dateFormatter = (dateString, locale) => {
    const now = new Date();
    const date = new Date(Number(dateString));
    const elapsed = now.getTime() - date.getTime();

    const hours = Math.floor(elapsed / (1000*60*60));
    if(hours < 24){
        if(hours < 1){
            const minutes = Math.floor(elapsed / (1000 * 60));
            if(minutes < 1){
                const seconds = Math.floor(elapsed / 1000);
                return `${seconds} seconds ago`;
            } else {
                return `${minutes} minutes ago`
            }
        } else {
            return `${hours} hours ago`;
        }
    } else {
        return date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

}
