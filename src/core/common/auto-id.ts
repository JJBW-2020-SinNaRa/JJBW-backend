import {
  PrimaryGeneratedColumn,
} from "typeorm";

export abstract class AutoID {
  @PrimaryGeneratedColumn("increment")
  idx: number;
}
