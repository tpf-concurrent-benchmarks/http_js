import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  Unique,
  DataType,
} from "sequelize-typescript";

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Unique
  @Column(DataType.CHAR(30))
  user_name!: string;

  @Column(DataType.CHAR(60))
  hashed_password!: string;

  @HasMany(() => Poll)
  polls!: Poll[];

  @HasMany(() => Vote)
  votes!: Vote[];
}

@Table
export class Poll extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column
  poll_topic!: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  creator_id!: number;
  @BelongsTo(() => User)
  creator!: User;

  @HasMany(() => PollOption)
  options!: PollOption[];
}

@Table
export class PollOption extends Model {
  @ForeignKey(() => Poll)
  @PrimaryKey
  @Column(DataType.INTEGER)
  poll_id!: number;
  @BelongsTo(() => Poll)
  poll!: Poll;

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  option_id!: number;

  @Column
  option_text!: string;

  @HasMany(() => Vote)
  votes!: Vote[];
}

@Table
export class Vote extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;
  @BelongsTo(() => User)
  user!: User;

  @PrimaryKey
  @ForeignKey(() => PollOption)
  @Column(DataType.INTEGER)
  poll_id!: number;

  @ForeignKey(() => PollOption)
  @Column(DataType.INTEGER)
  option_id!: number;
  @BelongsTo(() => PollOption)
  option!: PollOption;
}

export default [User, Poll, PollOption, Vote];
