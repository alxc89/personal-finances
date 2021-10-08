import Router, { NextFunction, Request, Response } from "express";
import { FinancialMovementController } from "../controller/FinancialMovimentController";
const router = Router();

const financialMovementController = new FinancialMovementController();

router.get("/financial_movement", financialMovementController.findAll);
router.post("/financial_movement", financialMovementController.create);
router.delete("/financial_movement/:id", financialMovementController.delete);
router.put("/financial_movement/:id", financialMovementController.update);

export { router };
