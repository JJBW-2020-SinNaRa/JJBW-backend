import {
  PrimaryGeneratedColumn,
} from "typeorm";

export abstract class AutoUUID {
  @PrimaryGeneratedColumn("uuid")
  idx: string;
}

export abstract class AutoID {
  @PrimaryGeneratedColumn("increment")
  idx: number;
}
