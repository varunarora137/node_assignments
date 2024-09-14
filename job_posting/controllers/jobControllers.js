import job from "../models/jobModel.js";

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
export const createJob = catchAsync(async (req, res, next) => {
  const newJob = await job.create(req.body);
  if (!newJob) {
    const err = new Error("Job not created");
    err.statusCode = 400;
    err.status = "fail";
    return next(err);
  }
  res.status(201).json({
    status: "success",
    message: "Job Created",
    data: newJob,
  });
});

export const getJobs = catchAsync(async (req, res, next) => {
  const getAllJobs = await job.find({});
  if (!getAllJobs) {
    const err = new Error("Jobs not found");
    err.statusCode = 404;
    err.status = "fail";
    return next(err);
  }
  res.status(200).json({
    status: "success",
    data: getAllJobs,
  });
});

export const updateJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const jobToBeUpdated = await job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!jobToBeUpdated) {
    const err = new Error("Job not found");
    err.statusCode = 404;
    err.status = "fail";
    return next(err);
  }
  res.status(200).json({
    status: "success",
    data: jobToBeUpdated,
  });
});

export const deleteJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const jobDeleted = await job.findByIdAndDelete(id);
  if (!jobDeleted) {
    const err = new Error("Job not found");
    err.statusCode = 404;
    err.status = "fail";
    return next(err);
  }
  res.status(204).json({
    status: "success",
  });
});
