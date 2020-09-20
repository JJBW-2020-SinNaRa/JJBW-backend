import {
  Column,
  Entity,
  OneToMany,
} from "typeorm";
import {
  AutoUUID,
  defaultEmbeddedOption,
  DefaultTimestamp,
  AccessToken,
} from "src/core";
import { Badge } from "../badge/badge";
import { Report } from "../report/report";

@Entity({
  schema: "jjbw",
  name: "account",
})
export class Account extends AutoUUID {

  @Column({
    type: "varchar",
    name: "id",
    nullable: false,
    length: 320,
  })
  id: string;

  @Column({
    type: "varchar",
    name: "name",
    nullable: false,
    length: 50,
  })
  name: string

  @Column({
    type: "boolean",
    name: "is_admin",
    nullable: false,
    default: false,
  })
  isAdmin: boolean;

  @Column({
    type: "text",
    name: "public_key",
    nullable: false,
  })
  publicKey: string;

  @Column({
    type: "text",
    name: "private_key",
    nullable: false,
  })
  privateKey: string;

  @OneToMany(() => AccessToken, (token) => token.account)
  accessTokens: AccessToken[];

  @OneToMany(() => Badge, (badge) => badge.account)
  badges: Badge[];

  @OneToMany(() => Report, (report) => report.reporter)
  reports: Report[];

  @OneToMany(() => Report, (report) => report.cleaner)
  cleans: Report[];

  @Column(() => DefaultTimestamp, defaultEmbeddedOption)
  timestamps: Readonly<DefaultTimestamp>;
}
