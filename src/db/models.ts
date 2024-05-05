import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
} from "sequelize-typescript";

@Table
export class User extends Model {
  @Column
  @PrimaryKey
  @AutoIncrement
  id!: number;

  @Column
  user_name!: string;

  @Column
  hashed_password!: string;

  @HasMany(() => Poll)
  polls!: Poll[];

  @HasMany(() => Vote)
  votes!: Vote[];
}

@Table
export class Poll extends Model {
  @Column
  @PrimaryKey
  @AutoIncrement
  id!: number;

  @Column
  poll_topic!: string;

  @Column
  @ForeignKey(() => User)
  creatorId!: number;
  @BelongsTo(() => User)
  creator!: User;

  @HasMany(() => PollOption)
  options!: PollOption[];

  @HasMany(() => Vote)
  votes!: Vote[];
}

@Table
export class PollOption extends Model {
  @Column
  @ForeignKey(() => Poll)
  @PrimaryKey
  poll_id!: number;
  @BelongsTo(() => Poll)
  poll!: Poll;

  @Column
  @PrimaryKey
  @AutoIncrement
  option_id!: number;

  @Column
  option_text!: string;

  @HasMany(() => Vote)
  votes!: Vote[];
}

@Table
export class Vote extends Model {
  @Column
  @PrimaryKey
  @ForeignKey(() => User)
  userId!: number;
  @BelongsTo(() => User)
  user!: User;

  @Column
  @PrimaryKey
  @ForeignKey(() => Poll)
  pollId!: number;
  @BelongsTo(() => Poll)
  poll!: Poll;

  @Column
  @ForeignKey(() => PollOption)
  optionId!: number;
  @BelongsTo(() => PollOption)
  option!: PollOption;
}

export default [User, Poll, PollOption, Vote];
