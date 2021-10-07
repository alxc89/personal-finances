import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { FinancialMoviment } from "../models/FinancialMoviment";
import * as yup from "yup";

class FinancialMovimentController {
  async findAll(req: Request, res: Response) {
    try {
      const financialMovimentRepository = getRepository(FinancialMoviment);
      const financialmoviment = await financialMovimentRepository.find();

      return res.json(financialmoviment);
    } catch (e) {
      return res.json(e);
    }
  }

  async create(req: Request, res: Response) {
    const { movimenttype, description, amount, date } = req.body;
    const financialMovimentRepository = getRepository(FinancialMoviment);
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

    const createMoviment = financialMovimentRepository.create({
      movimenttype,
      description,
      amount,
      date,
    });

    await financialMovimentRepository.save(createMoviment);
    return res.json(createMoviment);
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const financialMovimentRepository = getRepository(FinancialMoviment);
      const movimentId = await financialMovimentRepository.findOne(id);

      if (movimentId == undefined) {
        return res.status(400).json("Not found to delete");
      }

      await financialMovimentRepository.delete(id);

      return res.json("Financial moviment deleted");
    } catch (error) {
      res.json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const financialMovimentRepository = getRepository(FinancialMoviment);
      const movimentId = await financialMovimentRepository.findOne(id);

      if (movimentId == undefined) {
        return res.json("Not found for change");
      }

      const updateMoviment = await financialMovimentRepository.update(
        id,
        req.body
      );

      return res.json(updateMoviment);
    } catch (error) {
      return res.json(error);
    }
  }
}

export { FinancialMovimentController };
