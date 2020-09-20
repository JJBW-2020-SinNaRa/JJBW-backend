import {
  getRepository,
} from "typeorm";
import {
  Account,
} from "src/core";

const findOneByID = (
  id: string,
) => {
  const repository = getRepository(Account);
  return repository.createQueryBuilder("account")
    .where("account.id = :id", { id })
    .getOne();
};

const findOneByIDX = (
  idx: string,
) => {
  const repository = getRepository(Account);
  return repository.createQueryBuilder("account")
    .where("account.idx = :idx", { idx })
    .getOne();
};

const createID = async (
  id: string,
  name: string,
  publicKey: string,
  privateKey: string,
  isAdmin: boolean = false,
) => {
  const repository = getRepository(Account);
  const account = new Account();
  account.id = id;
  account.name = name;
  account.isAdmin = isAdmin;
  account.publicKey = publicKey;
  account.privateKey = privateKey;
  return repository.manager.save(account);
}

export const AccountService = {
  findOneByID,
  createID,
  findOneByIDX,
};
