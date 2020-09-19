import {
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export class DefaultTimestamp {

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
  })
  createdAt: Readonly<Date>;

  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
  })
  updatedAt: Readonly<Date>;
}
