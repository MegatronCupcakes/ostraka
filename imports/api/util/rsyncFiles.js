import Rsync from 'rsync';

const RsyncFiles = async (tempPath, destination) => {
    return new Promise((resolve, reject) => {
        try {
            const rsync = new Rsync()
            .flags('r')
            .source(tempPath)
            .destination(destination);
            rsync.execute((error, code, cmd) => {
                if(error){
                    reject(error);
                } else {
                    resolve(code, cmd);
                }
            });
        } catch(error){
            reject(error);
        }
    });
}
export default RsyncFiles;
