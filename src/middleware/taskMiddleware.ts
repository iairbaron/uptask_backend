import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export async function validateTaskExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;
    const task = (await Task.findById(taskId)) as ITask;

    if (!task) {
      const error = new Error("Wrong ID project not found");
      return res.status(404).json(error.message);
    }

    req.task = task;
    next();
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
}
