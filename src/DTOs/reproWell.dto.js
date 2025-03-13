const createReproWellFormDto = (data) => {
    const { Name,} = data;
    return {
        Name,
    }
}

module.exports = createReproWellFormDto;