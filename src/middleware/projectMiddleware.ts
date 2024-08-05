import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Proyect";

declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}

export async function validateProjectExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId } = req.params;
    const project = await Project.findById<IProject>(projectId);

    if (!project) {
      const error = new Error("Wrong ID project not found");
      return res.status(404).json(error.message);
    }
    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
}
