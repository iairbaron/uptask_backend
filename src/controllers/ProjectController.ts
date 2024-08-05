import type { Request, Response } from "express";
import Project from "../models/Proyect";
import { Error } from "mongoose";

export class Projectcontroller {
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});

      res.json(projects);
    } catch (error) {}
  };

  static getProjectByID = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    try {
      const project = await Project.findById(projectId).populate("tasks");
      if (!project) {
        const error = new Error("Wrong ID project not found");
        res.status(400).json(error.message);
      }

      res.json(project);
    } catch (error) {
      console.log(Error);
    }
  };

  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);
    try {
      await project.save();
      res.send("Project created succefully");
    } catch (err) {
      console.log(err);
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    try {
      const project = await Project.findByIdAndUpdate(projectId, req.body);
      if (!project) {
        const error = new Error("Wrong ID project not found");
        res.status(400).json(error.message);
      }
      res.json(project);
    } catch (error) {
      console.log(Error);
    }
  };

  static deleteProjectById = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    try {
      const project = await Project.findByIdAndDelete(projectId);
      if (!project) {
        const error = new Error("Wrong ID project not found");
        res.status(400).json(error.message);
      }
      res.send("Project deleted succefully");
    } catch (error) {
      console.log(Error);
    }
  };
}
