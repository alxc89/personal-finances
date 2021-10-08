import { EntityRepository, Repository } from "typeorm";
import { FinancialMovement } from "../models/FinancialMovement";

@EntityRepository(FinancialMovement)
class FinancialRepositorys extends Repository<FinancialMovement> {}
export { FinancialRepositorys };
