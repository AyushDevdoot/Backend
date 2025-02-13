const coachNameSearchDto = (data) => {
    const {
        name,
        page = 1,
    } = data;

    return {
        coachName: name,
        page,
    };
};

const validateCoachNameSearchDto = (data) => {
    const errors = {};

    if (!data.coachName || typeof data.coachName !== 'string' || data.coachName.trim().length < 1) {
        errors.coachName = "coachName must be a valid string and at least 2 characters long.";
    }

    if (!data.page || typeof data.page !== 'number') {
        errors.page = "page must be a number";
    }
    return errors;
};


const coachNameFilterSearchDto = (data) => {
    const {
        name,
        page = 1,
    } = data;

    return {
        coachName: name,
        page,
    };
};



const coachCategorySearchDto = (data) => {
    const {
        category,
        page = 1,
    } = data;

    return {
	category,
        page,
    };
};

const validateCoachCategorySearchDto = (data) => {
    const errors = {};

    if (!data.category || typeof data.category !== 'string' || data.category.trim().length < 4) {
        errors.category = "category must be a valid string";
    }

    if (!data.page || typeof data.page !== 'number') {
        errors.page = "page must be a number";
    }
    return errors;
};





const coachLanguageSearchDto = (data) => {
    const {
        language,
        page = 1,
    } = data;

    return {
        language,
        page,
    };
};


const validateCoachLanguageSearchDto = (data) => {
    const errors = {};

    if (!data.language || typeof data.language !== 'string' || data.language.trim().length < 1) {
        errors.language = "language must be a valid string and at least 2 characters long.";
    }

    if (!data.page || typeof data.page !== 'number') {
        errors.page = "page must be a number";
    }
    return errors;
};

const coachSortedSearchDto = (data) => {
    const {
        sort_by,
	ascending = true,
        page = 1,
    } = data;
    return {
	sort_by,
        ascending,
        page,
    };
};


const validateCoachSortedSearchDto = (data) => {
    const errors = {};
    const VALID_SORTED_FIELDS = {'rating': true,'priceperminute': true,'country': true};
    if (!data.sort_by || typeof data.sort_by !== 'string' || data.sort_by.trim().length < 4 || !VALID_SORTED_FIELDS[data.sort_by.toLowerCase()]) {
	    errors.sort_by = "sort_by must be a valid string options :- [pricePerMinute, rating, country].";
    }

    if (!data.ascending || typeof data.ascending !== 'boolean'){
	    errors.ascending = "ascending must be a boolean true/false";
    }
    if (!data.page || typeof data.page !== 'number') {
        errors.page = "page must be a number";
    }
    return errors;
};



module.exports = {
    coachNameSearchDto,
    validateCoachNameSearchDto,
    coachNameFilterSearchDto,
    coachCategorySearchDto,
    validateCoachCategorySearchDto,
    coachLanguageSearchDto,
    validateCoachLanguageSearchDto,
    coachSortedSearchDto,
    validateCoachSortedSearchDto

};
