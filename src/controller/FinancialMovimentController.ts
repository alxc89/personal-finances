import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { FinancialMovement } from "../models/FinancialMovement";
import * as yup from "yup";

class FinancialMovementController {
  async findAll(req: Request, res: Response) {
    try {
      const financialMovementRepository = getRepository(FinancialMovement);
      const financialmovements = await financialMovementRepository.find();

      const entradas = financialmovements.reduce(
        (accumulator, financialMovement) => {
          if (financialMovement.movimenttype === "Entrada") {
            accumulator = accumulator + Number(financialMovement.amount);
          }
          return accumulator;
        },
        0
      );

      const saidas = financialmovements.reduce(
        (accumulator, financialmovement) =>
          financialmovement.movimenttype === "Saída"
            ? accumulator + financialmovement.amount
            : accumulator,
        0
      );

      const movements = {
        financialmovements,
        totals: {
          entradas,
          saidas,
          total: entradas - saidas,
        },
      };

      return res.json(movements);
    } catch (e) {
      return res.json(e);
    }
  }

  async create(req: Request, res: Response) {
    const { movimenttype, description, amount, date } = req.body;
    const financialMovementRepository = getRepository(FinancialMovement);
    const schema = yup.object().shape({
      movimenttype: yup.string().required(),
      description: yup.string().required(),
      amount: yup.number().required(),
      date: yup.date().required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (errors: any) {
      return res.json(errors.message);
    }

    const createMovement = financialMovementRepository.create({
      movimenttype,
      description,
      amount,
      date,
    });

    await financialMovementRepository.save(createMovement);
    return res.json(createMovement);
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const financialMovementRepository = getRepository(FinancialMovement);
      const movementId = await financialMovementRepository.findOne(id);

      if (movementId == undefined) {
        return res.status(400).json("Not found to delete");
      }

      await financialMovementRepository.delete(id);

      return res.json("Financial moviment deleted");
    } catch (error) {
      res.json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const financialMovementRepository = getRepository(FinancialMovement);
      const movementId = await financialMovementRepository.findOne(id);

      if (movementId == undefined) {
        return res.json("Not found for change");
      }

      const updateMovement = await financialMovementRepository.update(
        id,
        req.body
      );

      return res.json(updateMovement);
    } catch (error) {
      return res.json(error);
    }
  }
}

export { FinancialMovementController };
