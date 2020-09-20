import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import {
  Account,
  AutoID,
  defaultEmbeddedOption,
  DefaultTimestamp,
} from "src/core";

@Entity({
  schema: "jjbw",
  name: "badge",
})
export class Badge extends AutoID {

  @Column({
    type: "varchar",
    name: "name",
    nullable: false,
    length: 255,
  })
  name: string;

  @Column({
    type: "varchar",
    name: "obtain",
    nullable: false,
    length: 255,
  })
  obtain: string;

  @Column({
    type: "text",
    name: "badge_url",
    nullable: false,
  })
  badgeURL: string;

  @ManyToOne(() => Account, (account) => account.badges)
  @JoinColumn({ name: "account_id" })
  account: Account;

  @Column(() => DefaultTimestamp, defaultEmbeddedOption)
  timestamp: Readonly<DefaultTimestamp>;
}
