import Router, { NextFunction, Request, Response } from "express";
import { FinancialMovimentController } from "../controller/FinancialMoviment";
const router = Router();

const financialMovimentController = new FinancialMovimentController();

router.get("/financialmoviment", financialMovimentController.findAll);
router.post("/financialmoviment", financialMovimentController.create);
router.delete("/financialmoviment/:id", financialMovimentController.delete);
router.put("/financialmoviment/:id", financialMovimentController.update);

export { router };
