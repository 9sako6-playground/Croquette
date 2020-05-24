// @ts-check
const { TypeScriptPlugin } = require("dprint-plugin-typescript");
const { JsoncPlugin } = require("dprint-plugin-jsonc");

/** @type { import("dprint").Configuration } */
module.exports.config = {
    projectType: "openSource",
    lineWidth: 160,
    plugins: [
        new TypeScriptPlugin({
            quoteStyle: 'preferSingle',
            indentWidth: 2,
        }),
        new JsoncPlugin({
            indentWidth: 2,
        }),
    ],
    includes: [
        "index.ts",
        "src/**/*.{ts,tsx,json,js,jsx}",
        "tests/**/*.{ts,tsx,json,js,jsx}",
    ],
};
