import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("financial_movement")
class FinancialMovement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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
}

export { FinancialMovement };
