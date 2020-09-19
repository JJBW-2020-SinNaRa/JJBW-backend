import {
  Column,
  Entity,
} from "typeorm";
import {
  AutoUUID,
  defaultEmbeddedOption,
  DefaultTimestamp,
} from "src/core";

@Entity({
  schema: "jjbw",
  name: "trash",
})
export class Trash extends AutoUUID {


  @Column(() => DefaultTimestamp, defaultEmbeddedOption)
  timestamps: Readonly<DefaultTimestamp>;
}
