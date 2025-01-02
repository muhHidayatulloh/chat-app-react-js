const getOffset = (currentPage, listPerPage) => {
    const offset = (currentPage - 1) * listPerPage;
    return offset;
}

const emptyOrRows = (rows) => {
    if (!rows) {
        return [];
    }
    
    return rows;
}   

module.exports = {
    getOffset,
    emptyOrRows
}