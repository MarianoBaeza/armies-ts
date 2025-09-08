import { Civilization, INITIAL_COUNTS } from "./Civilization.js";
import {
  Archer,
  Knight,
  Pikeman,
  Training,
  Transformation,
  Unit,
} from "./Unit.js";

export type BattleOutcome = "WIN" | "LOSE" | "DRAW";

export interface BattleRecord {
  at: Date;
  opponent: string;
  result: BattleOutcome;
  ourPoints: number;
  theirPoints: number;
}

export class DomainError extends Error {}

export class Army {
  readonly id: string;
  readonly name: string;
  readonly civilization: Civilization;
  private _gold = 1000;
  private _units: Unit[] = [];
  private _history: BattleRecord[] = [];

  constructor(name: string, civilization: Civilization) {
    this.id = name;
    this.name = name;
    this.civilization = civilization;
    const counts = INITIAL_COUNTS[civilization];
    this._units = [
      ...Array.from({ length: counts.pikemen }, () => new Pikeman()),
      ...Array.from({ length: counts.archers }, () => new Archer()),
      ...Array.from({ length: counts.knights }, () => new Knight()),
    ];
  }

  get gold(): number {
    return this._gold;
  }

  get units(): readonly Unit[] {
    return this._units;
  }

  get totalPoints(): number {
    return this._units.reduce((acc, u) => acc + u.strength, 0);
  }

  get history(): readonly BattleRecord[] {
    return this._history;
  }

  private spend(cost: number) {
    if (this._gold < cost) throw new DomainError("Not enough gold");
    this._gold -= cost;
  }

  train(unitId: string) {
    const u = this._units.find((x) => x.id === unitId);
    if (!u) throw new DomainError("Unit not found");
    const { inc, cost } = Training.incAndCostFor(u);
    this.spend(cost);
    // @ts-ignore
    u.gainStrength(inc);
  }

  transform(unitId: string) {
    const idx = this._units.findIndex((x) => x.id === unitId);
    if (idx === -1) throw new DomainError("Unit not found");
    const u = this._units[idx];
    const { next, cost } = Transformation.upgrade(u);
    if (!next) throw new DomainError("This unit cannot be transformed further");
    this.spend(cost);
    this._units.splice(idx, 1, next);
  }

  battle(opponent: Army, at: Date = new Date()): BattleOutcome {
    const ourPts = this.totalPoints;
    const theirPts = opponent.totalPoints;

    let outcome: BattleOutcome = "DRAW";
    if (ourPts > theirPts) outcome = "WIN";
    else if (ourPts < theirPts) outcome = "LOSE";

    if (outcome === "WIN") {
      this._gold += 100;
      opponent.loseTopUnits(2);
    } else if (outcome === "LOSE") {
      opponent._gold += 100;
      this.loseTopUnits(2);
    } else {
      this.loseTopUnits(1);
      opponent.loseTopUnits(1);
    }
    this._history.push({
      at,
      opponent: opponent.name,
      result: outcome,
      ourPoints: ourPts,
      theirPoints: theirPts,
    });
    opponent._history.push({
      at,
      opponent: this.name,
      result: outcome === "WIN" ? "LOSE" : outcome === "LOSE" ? "WIN" : "DRAW",
      ourPoints: theirPts,
      theirPoints: ourPts,
    });

    return outcome;
  }

  private loseTopUnits(n: number) {
    if (n <= 0 || this._units.length === 0) return;
    const sorted = [...this._units].sort((a, b) => b.strength - a.strength);
    const toRemove = new Set(
      sorted.slice(0, Math.min(n, sorted.length)).map((u) => u.id)
    );
    this._units = this._units.filter((u) => !toRemove.has(u.id));
  }
}
