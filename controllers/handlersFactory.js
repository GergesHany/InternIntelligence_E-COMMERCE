const asyncHandler = require('express-async-handler')
const ApiError = require("../utils/apiError");

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


exports.updateOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new ApiError(`No ${Model.modelName} found with id ${id}`, 404));
    }
    
    res.status(200).json({ 
        data: doc
    });
});


exports.createOne = (Model) => asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json({ 
        data: doc
    }); 
});


exports.getOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findById(id);

    if (!doc) {
        return next(new ApiError(`No ${Model.modelName} found with id ${id}`, 404));
    }

    res.status(200).json({ 
        data: doc
    });
});