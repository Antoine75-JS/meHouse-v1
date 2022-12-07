import { Request, Response, NextFunction } from 'express';

import { OrganisationResponseT } from 'organisationsT';
import Organisation from '../models/organisation';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

// const Task = require('../models/task');
import Task from '../models/task';

import type { TaskResponseT, TaskT } from '../types/tasksT';

exports.getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasksFound = await Task.find();

    if (!tasksFound || tasksFound?.length < 1)
      throw new ErrorHandler(errors.notFound, 'Task not found');

    res.status(200).json({
      status: 'success',
      message: 'We found tasks',
      tasksFound
    });

    next();
  } catch (error: any) {
    next(error);
  }
};

exports.getOrganisationsTasks = async (
  req: Request,
  res: OrganisationResponseT,
  next: NextFunction
) => {
  try {
    const tasksFound = await Task.find({ orgaId: res.orgFound.id });

    if (!tasksFound || tasksFound?.length < 1)
      throw new ErrorHandler(errors.notFound, 'No task found');

    res.status(200).json({
      status: 'success',
      message: 'We found tasks in organisation',
      tasksFound
    });

    next();
  } catch (error: any) {
    next(error);
  }
};

exports.createNewTask = async (
  req: Request,
  res: OrganisationResponseT,
  next: NextFunction
) => {
  try {
    console.log('Orga :', res.orgFound);

    const newTask = new Task(req.body);

    if (!newTask) {
      throw new ErrorHandler(errors.notFound, 'Task was not created');
    }

    const updatedOrga = await Organisation.findOneAndUpdate(
      { _id: res.orgFound.id },
      { $push: { orgTasks: newTask } }
    );

    if (!updatedOrga)
      throw new ErrorHandler(
        errors.notFound,
        'Organisation could not be updated. Task was not created'
      );

    const savedTask: TaskT = await newTask.save().catch((err: any) => {
      console.log('error when adding task to Orga', err);
      throw new ErrorHandler(
        errors.notModified,
        'Could not save task, organisation not created'
      );
    });

    res.status(201).json({
      status: 'success',
      message: 'Task created',
      savedTask
    });

    next();
  } catch (error) {
    next(error);
  }
};

exports.resetTaskDate = async (
  req: Request,
  res: TaskResponseT,
  next: NextFunction
) => {
  try {
    console.log('reseting date', res.taskFound);

    const newDate = new Date();
    const expireDate = new Date();

    expireDate.setDate(newDate.getDate() + res.taskFound.repeatFrequency);

    // Update creation date + expireDate
    res.taskFound.creationDate = newDate;
    res.taskFound.expireDate = expireDate;

    // Send req.body as updated task
    req.body = res.taskFound;

    next();
  } catch (error) {}
};

// TODO
// Check for missing fields
exports.updateTask = async (
  req: Request,
  res: TaskResponseT,
  next: NextFunction
) => {
  try {
    const filter = { _id: res.taskFound?.id };
    const update = { ...req.body };

    // If empty body returns 304
    if (Object.keys(update).length === 0 && update.constructor === Object)
      throw new ErrorHandler(errors.notModified, 'Task was not updated');

    console.log(filter, update);

    const updatedTask = await Task.findOneAndUpdate(filter, update, {
      new: true
    });

    if (!updatedTask)
      throw new ErrorHandler(errors.notModified, 'Task was not updated');

    res.status(200).json({
      status: 'success',
      message: 'Task updated',
      updatedTask
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (
  req: Request,
  res: TaskResponseT,
  next: NextFunction
) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: res.taskFound?.id
    });

    if (!deletedTask)
      throw new ErrorHandler(errors.notModified, 'Task was not deleted');

    res.status(200).json({
      status: 'success',
      message: 'Task deleted',
      deletedTask
    });

    next();
  } catch (error) {
    next(error);
  }
};
