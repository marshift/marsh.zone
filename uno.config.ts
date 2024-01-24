import { defineConfig, presetUno, presetWebFonts, transformerVariantGroup } from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export default defineConfig({
    presets: [
        presetUno(),
        presetScrollbar(),
        presetWebFonts({
            provider: "google",
            fonts: {
                mono: "JetBrains Mono"
            }
        }),
    ],
    transformers: [transformerVariantGroup()],
    preflights: [
        {
            getCSS: ({ theme }: Record<string, any>) => {
                const preflightRaw = readFileSync(join(__dirname, "src/res/css/preflight.scss"), "utf-8");
                let preflight = preflightRaw;
                const matches = preflightRaw.matchAll(/(theme)[^"]*/g);

                for (const match of matches) {
                    const instance = preflightRaw.substring(match.index!, match.index! + match[0].length).split(".");
                    const [category, property] = instance.slice(1);
                    preflight = preflight.replace(`"${instance.join(".")}"`, theme[category][property]);
                }

                return preflight;
            }
        }
    ],
    theme: {
        fontFamily: {
            cozy: "Cozette"
        },
        colors: {
            // Background
            primary: "#313352",
            secondary: "#292a45",
            tertiary: "#202237",

            // Text
            header: "#fdfafb",
            normal: "#faf3f7",
            muted: "#f6e7ef",

            // Accents
            "accent-primary": "#e22e88",
            "accent-secondary": "#ab1862",
            "accent-alt": "#8080B7",
            selection: "#b32f7180",
        }
    },
})
