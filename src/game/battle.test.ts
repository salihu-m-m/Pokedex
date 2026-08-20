import { describe, it, expect } from "vitest";
import { calculateDamage } from "./battles.js";
import { BattlePokemon } from "./types.js";

function makePokemon(overrides: Partial<BattlePokemon> = {}): BattlePokemon {
  return {
    attack: 50,
    defense: 50,
    ...overrides,
  } as BattlePokemon;
}

describe("calculateDamage", () => {
  it("returns attack minus defense when positive", () => {
    const attacker = makePokemon({ attack: 80 });
    const defender = makePokemon({ defense: 30 });

    expect(calculateDamage(attacker, defender)).toBe(50);
  });

  it("returns 1 (minimum damage) when defense exceeds attack", () => {
    const attacker = makePokemon({ attack: 20 });
    const defender = makePokemon({ defense: 90 });

    expect(calculateDamage(attacker, defender)).toBe(1);
  });

  it("returns 1 when attack equals defense", () => {
    const attacker = makePokemon({ attack: 50 });
    const defender = makePokemon({ defense: 50 });

    expect(calculateDamage(attacker, defender)).toBe(1);
  });

  it("handles zero defense", () => {
    const attacker = makePokemon({ attack: 40 });
    const defender = makePokemon({ defense: 0 });

    expect(calculateDamage(attacker, defender)).toBe(40);
  });

  it("handles zero attack against zero defense (still floors at 1)", () => {
    const attacker = makePokemon({ attack: 0 });
    const defender = makePokemon({ defense: 0 });

    expect(calculateDamage(attacker, defender)).toBe(1);
  });
});