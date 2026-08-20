import { Cache } from "./pokecache.js";
import { expect, test } from "vitest";

test("stores a value", () => {
  const cache = new Cache(100);
  const key ="testing-key"
  const val = "testing-val"
    cache.add(key, val)
    const cached = cache.get<string>(key)
    expect(cached).toBe(val)
  // add a key and a value
  // retrieve the same key

  // expect the retrieved result to be that value

  cache.stopReapLoop();
});

test("stores and retrieves a cache value", async() => {
        const cache = new Cache(100);
        const key ="testing-key";
        const val = "testing-val";
        cache.add(key,val);
        await new Promise((resolve) => setTimeout(resolve, 400));
        const cached = cache.get<string>(key);
        expect(cached).toBe(undefined);

cache.stopReapLoop();
})