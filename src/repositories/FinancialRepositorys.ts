import { EntityRepository, Repository } from "typeorm";
import { FinancialMoviment } from "../models/FinancialMoviment";

@EntityRepository(FinancialMoviment)
class FinancialRepositorys extends Repository<FinancialMoviment> {}
export { FinancialRepositorys };
