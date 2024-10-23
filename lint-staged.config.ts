module.exports = {
    "src/*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}": [
        "biome check --write --no-errors-on-unmatched"
      ],
    '**/*.ts?(x)': () => 'npm run check-types',

  };
