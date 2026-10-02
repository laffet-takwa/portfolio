import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Abstract, generated cybersecurity wallpaper — no stock imagery. */
export function Wallpaper() {
    return (_jsxs("div", { "aria-hidden": "true", children: [_jsx("div", { className: "wallpaper" }), _jsxs("svg", { className: "wallpaper-motif", viewBox: "0 0 600 600", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "wm-stroke", x1: "0", y1: "0", x2: "1", y2: "1", children: [_jsx("stop", { offset: "0", stopColor: "currentColor", stopOpacity: "0.55" }), _jsx("stop", { offset: "1", stopColor: "currentColor", stopOpacity: "0.05" })] }) }), _jsx("path", { d: "M300 70l170 66v138c0 104-70 190-170 224-100-34-170-120-170-224V136z", stroke: "url(#wm-stroke)", strokeWidth: "1.5" }), _jsx("path", { d: "M300 130l112 44v92c0 69-46 126-112 149-66-23-112-80-112-149v-92z", stroke: "url(#wm-stroke)", strokeWidth: "1.5" }), _jsx("path", { d: "M300 190l56 22v50c0 37-23 68-56 79-33-11-56-42-56-79v-50z", stroke: "url(#wm-stroke)", strokeWidth: "1.5" }), [
                        [130, 190],
                        [470, 190],
                        [130, 470],
                        [470, 470],
                        [300, 90],
                        [90, 330],
                        [510, 330],
                    ].map(([cx, cy], index) => (_jsxs("g", { children: [_jsx("circle", { cx: cx, cy: cy, r: "4", fill: "currentColor", fillOpacity: 0.4 - index * 0.04 }), _jsx("circle", { cx: cx, cy: cy, r: "11", stroke: "currentColor", strokeOpacity: "0.16" }), _jsx("path", { d: `M300 300 L${cx} ${cy}`, stroke: "currentColor", strokeOpacity: "0.1", strokeWidth: "1" })] }, `${cx}-${cy}`)))] })] }));
}
