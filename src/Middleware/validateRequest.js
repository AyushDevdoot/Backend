const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.query, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.details.map((err) => err.message)
            });
        }
        next();
    };
};

module.exports = { validateRequest };