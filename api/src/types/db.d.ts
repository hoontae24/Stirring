import { QueryInterface, Transactionable, Logging } from 'sequelize';

declare namespace DB {
  interface Migration {
    up: MigrationFunction;
    down: MigrationFunction;
  }

  type MigrationFunction = (
    queryInterface: QueryInterface,
    options?: MigrationFunctionOptions,
  ) => Promise<void>;

  type MigrationFunctionOptions = Transactionable & Logging
}
