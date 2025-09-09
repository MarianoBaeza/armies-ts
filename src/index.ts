import { Army } from "./domain/Army.js";
import { Civilization } from "./domain/Civilization.js";

// Example Armies:
const a = new Army("Chinese Army", Civilization.Chinese);
const b = new Army("English Army", Civilization.English);
const c = new Army("Byzantine Army", Civilization.Byzantine);
// More than one Army by Civilization Example:
const d = new Army("Chinese Second Army", Civilization.Chinese);
const e = new Army("English Second Army", Civilization.English);

// // Get Army total points:
// console.log("Chinese Army points:", a.totalPoints, "gold:", a.gold);

// //Get Army units:
// console.log("Chinese units:", a.units);

// //Get Army single unit:
// console.log("Chinese First Unit:", a.units[0]);

// //Get Unit age:
// console.log("Chinese First Unit Age:", a.units[0].getAgeYears()); // Unit age is set to 25 years by default

const chineseFirstUnitId = a.units[0].id;

// //Train Unit Example:
// a.train(chineseFirstUnitId);
// console.log("Chinese First Unit Trained:", a.units[0]);

// //Transform Unit Example:
// a.transform(chineseFirstUnitId);
// console.log(
//   "Chinese First Unit Transformed:",
//   a.units[a.units.findIndex((x) => x.id === chineseFirstUnitId)]
// );

// //Battle Win Example:
// console.log("Byzantine Army gold before battle:", c.gold);
// console.log("Byzantine Army vs Chinese Army:", c.battle(a));
// console.log("Byzantine Army gold after battle:", c.gold);

// //Battle Lose Example:
// console.log("Chinese Army total units before battle:", a.units.length);
// console.log("Chinese Army vs English Army:", a.battle(b));
// console.log("Chinese Army total units after battle:", a.units.length);

// //Battle Draw Example:
// console.log("English Army total units before battle:", b.units.length);
// console.log("English Second Army total units before battle:", e.units.length);
// console.log("English Army vs English Second Army:", b.battle(e));
// console.log("English Army total units after battle:", b.units.length);
// console.log("English Second Army total units after battle:", e.units.length);

// // //Get Army Battle History:
// console.log("English Army Battle History:", b.history);
