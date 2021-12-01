export default TimeFrame = (span) => {
    const _now = new Date();
    let _then;
    switch(span){
        case("year"):
        _then = new Date(_now.getTime() - (365 * 24 * 60 * 60 * 1000));
        break;
        case("month"):
        _then = new Date(_now.getTime() - (30 * 24 * 60 * 60 * 1000));
        break;
        case("week"):
        _then = new Date(_now.getTime() - (7 * 24 * 60 * 60 * 1000));
        break;
        case("day"):
        _then = new Date(_now.getTime() - (24 * 60 * 60 * 1000));
        break;
    };
    return {now: _now, then: _then};
};
