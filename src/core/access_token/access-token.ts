import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import {
  defaultEmbeddedOption,
  AutoID,
  DefaultTimestamp,
  Account,
  AccessPayload
} from "src/core";

@Entity({
  schema: "jjbw",
  name: "access_token",
})
export class AccessToken extends AutoID {

  @Column({
    type: "text",
    name: "token",
    nullable: false,
  })
  token: string;

  @Column({
    type: "jsonb",
    name: "payload",
    nullable: false,
  })
  payload: AccessPayload;

  @Column({
    type: "timestamp",
    name: "expired_at",
    nullable: false,
  })
  expiredAt: Date;

  @ManyToOne(() => Account, (account) => account.accessTokens)
  @JoinColumn({ name: "account_id" })
  account: Account;

  @Column(() => DefaultTimestamp, defaultEmbeddedOption)
  timestamps: Readonly<DefaultTimestamp>;
}
