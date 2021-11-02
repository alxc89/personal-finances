import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("financial_movement")
class FinancialMovement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  moviment_type: string;

  @Column()
  description: string;

  @Column("decimal")
  amount: number;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;
}

export { FinancialMovement };
