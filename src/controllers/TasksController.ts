import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);

      task.project = req.project.id;

      req.project.tasks.push(task.id);

      Promise.allSettled([req.project.save(), await task.save()]);
      res.send("Task created succefully");
    } catch (err) {
      console.log(err);
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const listTasks = await Task.find({ project: req.project.id });

      res.send({ tasks: listTasks });
    } catch (err) {
      console.log(err);
    }
  };

  static getTaskByID = async (req: Request, res: Response) => {
    try {
      res.send({ task: req.task });
    } catch (err) {
      console.log(err);
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name;
      req.task.description = req.body.description;
      await req.task.save();

      res.send({ Message: "Project updated succefully" });
    } catch (err) {
      console.log(err);
    }
  };

  static updateTaskStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;

      req.task.status = status;
      req.task.save();

      res.send({ Message: "Status updated succefully", updatedTask: req.task });
    } catch (err) {
      console.log(err);
    }
  };
}
