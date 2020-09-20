import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import {
  AutoUUID,
  Account,
  defaultEmbeddedOption,
  DefaultTimestamp
} from "src/core";

@Entity({
  schema: "jjbw",
  name: "report",
})
export class Report extends AutoUUID {

  @Column({
    type: "float8",
    name: "reward",
    nullable: false,
    default: 0,
  })
  reward: number;

  @Column({
    type: "text",
    name: "description",
    nullable: false,
  })
  description: string;

  @Column({
    type: "text",
    name: "location",
    nullable: false,
  })
  location: string;

  @Column({
    type: "text",
    name: "type",
    nullable: false,
  })
  type: string;

  @Column({
    type: "text",
    name: "discovered_at",
    nullable: false,
  })
  discoveredAt: String;

  @Column({
    type: "text",
    name: "image",
    nullable: false,
  })
  image: string;

  @ManyToOne(() => Account, (account) => account.reports)
  @JoinColumn({ name: "reporter_id" })
  reporter: Account;

  @Column({
    type: "text",
    name: "found_photos",
    nullable: true,
  })
  foundPhotos: string;

  @Column({
    type: "text",
    name: "scene_photo",
    nullable: true,
  })
  scenePhoto: string;

  @Column({
    type: "text",
    name: "waste_photo",
    nullable: true,
  })
  wastePhoto: string;

  @ManyToOne(() => Account, (account) => account.cleans, { nullable: true })
  @JoinColumn({ name: "cleaner_id" })
  cleaner: Account;

  @Column({
    type: "boolean",
    name: "is_paid",
    nullable: false,
    default: false,
  })
  isPaid: boolean;

  @Column(() => DefaultTimestamp, defaultEmbeddedOption)
  timestamps: Readonly<DefaultTimestamp>;
}
