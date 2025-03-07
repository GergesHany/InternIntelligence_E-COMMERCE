const asyncHandler = require('express-async-handler')
const ApiError = require("../utils/apiError");
const APIFeatures = require("../utils/apiFeatures");

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


exports.getOne = (Model, populationOpts) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);
    if (populationOpts) {
        query = query.populate(populationOpts);
    }
    const doc = await query;
    if (!doc) {
        return next(new ApiError(`No ${Model.modelName} found with id ${id}`, 404));
    }
    res.status(200).json({ 
        data: doc
    });
});


exports.getAll = (Model, modelName = '') => asyncHandler(async (req, res) => {
    let filterObj = {};
    if (req.filterObj) {
        filterObj = {...req.filterObj };
    }

    const DocumentsCount = await Model.countDocuments();
    const features = new APIFeatures(Model.find(filterObj), req.query).filter().search(modelName).sort().limitFields().paginate(DocumentsCount);

    const {mongooseQuery, paginationResult} = features;
    const docs = await mongooseQuery;

    res.status(200).json({
        success: true,
        pagination: paginationResult,
        count: docs.length,
        data: docs
    })
});