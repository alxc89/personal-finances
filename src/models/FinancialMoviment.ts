import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("financial_moviment")
class FinancialMoviment {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  movimenttype: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}

export { FinancialMoviment };
