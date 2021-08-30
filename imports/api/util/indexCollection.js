const IndexCollection = async (collection, indexArray) => {
    return await Promise.all(indexArray.map((indexSetting) => {
        return new Promise((resolve, reject) => {
            collection.rawCollection().createIndex(indexSetting);
            resolve();
        });
    }));
}
export default IndexCollection;
