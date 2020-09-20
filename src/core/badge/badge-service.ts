import {
  getRepository,
} from "typeorm";
import {
  Account,
  Badge,
} from "src/core";

const getBadges = (
  account: Account,
) => {
  const repository = getRepository(Badge);
  return repository
    .createQueryBuilder("badge")
    .leftJoinAndMapOne("badge.account", Account, "account", "badge.account = account.idx")
    .where("account.idx = :idx", { idx: account.idx })
    .getMany();
};

const getBadge = (
  idx: number,
) => {
  const repository = getRepository(Badge);
  return repository
    .createQueryBuilder("badge")
    .leftJoinAndMapOne("badge.account", Account, "account", "badge.account = account.idx")
    .where("badge.idx = :idx", { idx })
    .getOne();
};

const createOne = (
  account: Account,
  name: string,
  obtain: string,
  image: string,
) => {
  const repository = getRepository(Badge);
  const badge = new Badge();
  badge.name = name;
  badge.obtain = obtain;
  badge.badgeURL = image;
  badge.account = account;
  return repository.manager.save(badge);
}

export const BadgeService = {
  getBadge,
  getBadges,
  createOne,
};
