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

  @Column(() => DefaultTimestamp, defaultEmbeddedOption)
  timestamps: Readonly<DefaultTimestamp>;
}
