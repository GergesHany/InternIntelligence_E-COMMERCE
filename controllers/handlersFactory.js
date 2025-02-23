const asyncHandler = require('express-async-handler')
const ApiError = require("../utils/apiError");
const APIFeatures = require('../utils/apiFeatures');


exports.deleteOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
        return next(new ApiError(`No ${Model.modelName} found with id ${id}`, 404));
    }
    res.status(200).json({ 
        data: `${Model.modelName} deleted successfully` 
    });
});