import { Router } from "express";
import { Projectcontroller } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleinputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TasksController";
import { validateProjectExist } from "../middleware/projectMiddleware";
import { validateTaskExist } from "../middleware/taskMiddleware";

const router = Router();

router.get("/", Projectcontroller.getAllProjects);

router.param("projectId", validateProjectExist);

router.get(
  "/:projectId",
  param("projectId").isMongoId().withMessage("id not valid"),
  handleinputErrors,
  Projectcontroller.getProjectByID
);

router.post(
  "/",
  body("projectName").notEmpty().withMessage("The name cannot be empty"),
  body("clientName").notEmpty().withMessage("The Client name cannot be empty"),
  body("description").notEmpty().withMessage("The Description cannot be empty"),
  handleinputErrors,
  Projectcontroller.createProject
);

router.put(
  "/:projectId",
  param("projectId").isMongoId().withMessage("id not valid"),
  body("projectName").notEmpty().withMessage("The name cannot be empty"),
  body("clientName").notEmpty().withMessage("The Client name cannot be empty"),
  body("description").notEmpty().withMessage("The Description cannot be empty"),
  handleinputErrors,
  Projectcontroller.updateProject
);

router.delete(
  "/:projectId",
  param("projectId").isMongoId().withMessage("id not valid"),
  handleinputErrors,
  Projectcontroller.deleteProjectById
);

router.post(
  "/:projectId/tasks",
  param("projectId").isMongoId().withMessage("id not valid"),
  body("name").notEmpty().withMessage("The name cannot be empty"),
  body("description").notEmpty().withMessage("The Description cannot be empty"),
  handleinputErrors,
  TaskController.createTask
);

router.get(
  "/:projectId/tasks",
  param("projectId").isMongoId().withMessage("id not valid"),
  handleinputErrors,
  TaskController.getProjectTasks
);

router.param("taskId", validateTaskExist);

router.get(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("id not valid"),
  param("taskId").isMongoId().withMessage("id not valid"),
  handleinputErrors,
  TaskController.getTaskByID
);

router.put(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("Project id not valid"),
  param("taskId").isMongoId().withMessage("Task id not valid"),
  body("name").notEmpty().withMessage("The name cannot be empty"),
  body("description").notEmpty().withMessage("The Description cannot be empty"),
  handleinputErrors,
  TaskController.updateTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("projectId").isMongoId().withMessage("Project id not valid"),
  param("taskId").isMongoId().withMessage("Task id not valid"),
  body("status").notEmpty().withMessage("The name cannot be empty"),
  handleinputErrors,
  TaskController.updateTaskStatus
);

export default router;
