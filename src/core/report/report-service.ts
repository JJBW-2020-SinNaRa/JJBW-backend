import {
  getRepository,
} from "typeorm";
import {
  Account,
  Report,
} from "src/core";

const createReport = (
  reward: number,
  description: string,
  location: string,
  type: string,
  discoveredAt: string,
  image: string,
  reporter: Account,
) => {
  const repository = getRepository(Report);
  const report = new Report();
  report.reward = reward;
  report.description = description;
  report.location = location;
  report.type = type;
  report.discoveredAt = discoveredAt;
  report.image = image;
  report.reporter = reporter;
  return repository.manager.save(report);
};

const findMany = () => {
  const repository = getRepository(Report);
  return repository
    .createQueryBuilder("report")
    .leftJoinAndMapOne("report.reporter", Account, "account", "report.reporter = account.idx")
    .leftJoinAndMapOne("report.cleaner", Account, "account", "report.cleaner = account.idx")
    .getMany();
};

const findOne = (
  idx: string,
) => {
  const repository = getRepository(Report);
  return repository
    .createQueryBuilder("report")
    .leftJoinAndMapOne("report.reporter", Account, "account", "report.reporter = account.idx")
    .leftJoinAndMapOne("report.cleaner", Account, "account", "report.cleaner = account.idx")
    .where("report.idx = :idx", { idx: idx })
    .getOne();
};

const updatePaid = (
  report: Report,
  update: boolean,
) => {
  const repository = getRepository(Report);
  report.isPaid = update;
  return repository.manager.save(report);
}

export const ReportService = {
  createReport,
  findMany,
  findOne,
  updatePaid,
};
