import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  amount: number;
  @Column()
  currency: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  category: string;
}
