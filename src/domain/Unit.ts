import { randomUUID } from "node:crypto";

export type UnitType = "Pikeman" | "Archer" | "Knight";

export abstract class Unit {
  readonly id: string;
  readonly createdAt: Date;
  protected _strength: number;

  protected constructor(baseStrength: number, createdAt?: Date, _id?: string) {
    this.id = _id ? _id : randomUUID();
    this.createdAt = createdAt ?? new Date("2000-09-08T07:00:00");
    this._strength = baseStrength;
  }

  get type(): UnitType {
    return this.constructor.name as UnitType;
  }

  get strength(): number {
    return this._strength;
  }

  getAgeYears(now: Date = new Date()): number {
    const ms = now.getTime() - this.createdAt.getTime();
    return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24 * 365)));
  }

  protected gainStrength(delta: number) {
    this._strength += delta;
  }
}

export class Pikeman extends Unit {
  static readonly BASE = 5;
  static readonly TRAIN_INC = 3;
  static readonly TRAIN_COST = 10;

  constructor(createdAt?: Date, id?: string, strengthModifier?: number) {
    super(
      strengthModifier ? Pikeman.BASE + strengthModifier : Pikeman.BASE,
      createdAt,
      id
    );
  }
}

export class Archer extends Unit {
  static readonly BASE = 10;
  static readonly TRAIN_INC = 7;
  static readonly TRAIN_COST = 20;

  constructor(createdAt?: Date, id?: string, strengthModifier?: number) {
    super(
      strengthModifier ? Archer.BASE + strengthModifier : Archer.BASE,
      createdAt,
      id
    );
  }
}

export class Knight extends Unit {
  static readonly BASE = 20;
  static readonly TRAIN_INC = 10;
  static readonly TRAIN_COST = 30;

  constructor(createdAt?: Date, id?: string, strengthModifier?: number) {
    super(
      strengthModifier ? Knight.BASE + strengthModifier : Knight.BASE,
      createdAt,
      id
    );
  }
}

export const Training = {
  incAndCostFor(u: Unit): { inc: number; cost: number } {
    if (u instanceof Pikeman)
      return { inc: Pikeman.TRAIN_INC, cost: Pikeman.TRAIN_COST };
    if (u instanceof Archer)
      return { inc: Archer.TRAIN_INC, cost: Archer.TRAIN_COST };
    return { inc: Knight.TRAIN_INC, cost: Knight.TRAIN_COST };
  },
};

export const Transformation = {
  upgrade(u: Unit): { next?: Unit; cost: number } {
    if (u instanceof Pikeman) {
      if (u.strength > Pikeman.BASE)
        return {
          next: new Archer(u.createdAt, u.id, u.strength - Pikeman.BASE),
          cost: 30,
        };
      return { next: new Archer(u.createdAt), cost: 30 };
    }
    if (u instanceof Archer) {
      if (u.strength > Archer.BASE)
        return {
          next: new Knight(u.createdAt, u.id, u.strength - Archer.BASE),
          cost: 30,
        };
      return { next: new Knight(u.createdAt), cost: 40 };
    }
    return { next: undefined, cost: Infinity };
  },
};
