import { readFileSync, writeFileSync } from "fs";
import { resolveValues } from "./utils.mjs";

const createResolvedTokens = () => {
  const raw = readFileSync("./tokens.json");
  const data = JSON.parse(raw);
  const resolvedTokens = resolveValues(data);
  writeFileSync(
    "./resolved-tokens.json",
    JSON.stringify(resolvedTokens, null, 2)
  );
};

createResolvedTokens();
