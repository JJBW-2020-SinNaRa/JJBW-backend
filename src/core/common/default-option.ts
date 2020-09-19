import type {
  ColumnEmbeddedOptions,
} from "typeorm/decorator/options/ColumnEmbeddedOptions";
import type {
  RelationOptions,
} from "typeorm";

export const defaultEmbeddedOption: ColumnEmbeddedOptions = {
  prefix: false,
};

export const defaultRelationOption: RelationOptions = {
  nullable: false,
}
