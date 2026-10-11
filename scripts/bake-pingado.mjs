// Gera src/components/pingado-art.ts
//
// O Pingado foi desenhado com um "tremido de mão" (ruído suave aplicado aos pontos das linhas).
// Em vez de fazer isso com filtros SVG em tempo de execução (pesado no celular e quebra animações),
// o tremido é calculado AQUI, uma vez, e o resultado vira texto nos paths.
//
// Para mexer no desenho: edite as geometrias em `SRC` abaixo e rode
//   node scripts/bake-pingado.mjs
// (Não precisa instalar nada.)
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/* ---------------- parser (comandos absolutos: M L H V C S Q Z) ---------------- */
function parse(d) {
  const tok = d.match(/[MLHVCSQZ]|-?\d*\.?\d+/g);
  let i = 0, cmd = null, cur = [0, 0], start = [0, 0], prevC2 = null, sub = null;
  const subs = [];
  const num = () => parseFloat(tok[i++]);
  while (i < tok.length) {
    if (/^[A-Z]$/.test(tok[i])) cmd = tok[i++];
    if (cmd === "Z") {
      if (cur[0] !== start[0] || cur[1] !== start[1]) sub.segs.push({ t: "L", p: [cur, start] });
      sub.closed = true; cur = start; prevC2 = null; continue;
    }
    if (cmd === "M") {
      const p = [num(), num()];
      sub = { start: p, segs: [], closed: false }; subs.push(sub);
      cur = p; start = p; prevC2 = null; cmd = "L";
    } else if (cmd === "L") {
      const p = [num(), num()]; sub.segs.push({ t: "L", p: [cur, p] }); cur = p; prevC2 = null;
    } else if (cmd === "H") {
      const p = [num(), cur[1]]; sub.segs.push({ t: "L", p: [cur, p] }); cur = p; prevC2 = null;
    } else if (cmd === "V") {
      const p = [cur[0], num()]; sub.segs.push({ t: "L", p: [cur, p] }); cur = p; prevC2 = null;
    } else if (cmd === "C") {
      const c1 = [num(), num()], c2 = [num(), num()], p = [num(), num()];
      sub.segs.push({ t: "C", p: [cur, c1, c2, p] }); cur = p; prevC2 = c2;
    } else if (cmd === "S") {
      const c1 = prevC2 ? [2 * cur[0] - prevC2[0], 2 * cur[1] - prevC2[1]] : cur;
      const c2 = [num(), num()], p = [num(), num()];
      sub.segs.push({ t: "C", p: [cur, c1, c2, p] }); cur = p; prevC2 = c2;
    } else if (cmd === "Q") {
      const c = [num(), num()], p = [num(), num()];
      const c1 = [cur[0] + (2 / 3) * (c[0] - cur[0]), cur[1] + (2 / 3) * (c[1] - cur[1])];
      const c2 = [p[0] + (2 / 3) * (c[0] - p[0]), p[1] + (2 / 3) * (c[1] - p[1])];
      sub.segs.push({ t: "C", p: [cur, c1, c2, p] }); cur = p; prevC2 = null;
    } else throw new Error("comando não suportado: " + cmd);
  }
  return subs;
}

/* ---------------- geometria ---------------- */
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const bez = ([p0, p1, p2, p3], t) => {
  const u = 1 - t;
  return [0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k]);
};
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
function segLen(s) {
  if (s.t === "L") return dist(s.p[0], s.p[1]);
  let len = 0, prev = s.p[0];
  for (let k = 1; k <= 12; k++) { const q = bez(s.p, k / 12); len += dist(prev, q); prev = q; }
  return len;
}

/* ---------------- ruído suave ---------------- */
function hash(ix, iy, seed) {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263) ^ Math.imul(seed, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}
const smooth = (t) => t * t * (3 - 2 * t);
function vnoise(x, y, seed) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const a = hash(ix, iy, seed), b = hash(ix + 1, iy, seed), c = hash(ix, iy + 1, seed), d = hash(ix + 1, iy + 1, seed);
  const u = smooth(fx), v = smooth(fy);
  return (a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v) * 2 - 1;
}
function displace([x, y], { amp, freq }) {
  const dx = vnoise(x * freq, y * freq, 11) * 0.7 + vnoise(x * freq * 2.3, y * freq * 2.3, 13) * 0.3;
  const dy = vnoise(x * freq + 40, y * freq + 40, 17) * 0.7 + vnoise(x * freq * 2.3 + 40, y * freq * 2.3 + 40, 19) * 0.3;
  return [x + dx * amp, y + dy * amp];
}

/* ---------------- amostragem + spline ---------------- */
function flatten(sub, step) {
  const pts = [sub.start], junction = [true];
  for (const s of sub.segs) {
    const n = Math.max(s.t === "L" ? 1 : 2, Math.round(segLen(s) / step));
    for (let k = 1; k <= n; k++) {
      pts.push(s.t === "L" ? lerp(s.p[0], s.p[1], k / n) : bez(s.p, k / n));
      junction.push(k === n);
    }
  }
  return { pts, junction };
}
function angleBetween(a, b) {
  const la = Math.hypot(...a), lb = Math.hypot(...b);
  if (la < 1e-6 || lb < 1e-6) return 0;
  return (Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / (la * lb)))) * 180) / Math.PI;
}
const f1 = (n) => String(Math.round(n * 10) / 10);
function spanBez(Q) {
  // Q: pontos de um trecho aberto, vão de um "canto" ao próximo
  if (Q.length === 2) return `L${f1(Q[1][0])} ${f1(Q[1][1])}`;
  const m = Q.length;
  const ext = [[2 * Q[0][0] - Q[1][0], 2 * Q[0][1] - Q[1][1]], ...Q, [2 * Q[m - 1][0] - Q[m - 2][0], 2 * Q[m - 1][1] - Q[m - 2][1]]];
  let out = "";
  for (let i = 0; i < m - 1; i++) {
    const P0 = ext[i], P1 = ext[i + 1], P2 = ext[i + 2], P3 = ext[i + 3];
    const c1 = [P1[0] + (P2[0] - P0[0]) / 6, P1[1] + (P2[1] - P0[1]) / 6];
    const c2 = [P2[0] - (P3[0] - P1[0]) / 6, P2[1] - (P3[1] - P1[1]) / 6];
    out += `C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(P2[0])} ${f1(P2[1])}`;
  }
  return out;
}
function cyclicBez(P) {
  const n = P.length;
  let out = "";
  for (let i = 0; i < n; i++) {
    const P0 = P[(i - 1 + n) % n], P1 = P[i], P2 = P[(i + 1) % n], P3 = P[(i + 2) % n];
    const c1 = [P1[0] + (P2[0] - P0[0]) / 6, P1[1] + (P2[1] - P0[1]) / 6];
    const c2 = [P2[0] - (P3[0] - P1[0]) / 6, P2[1] - (P3[1] - P1[1]) / 6];
    out += `C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(P2[0])} ${f1(P2[1])}`;
  }
  return out;
}

function bakeSub(sub, opt) {
  const { pts: raw, junction } = flatten(sub, opt.step);
  let pts = raw.map((p) => displace(p, opt));
  let jn = junction.slice();
  if (sub.closed) { pts.pop(); jn.pop(); } // o último ponto repete o primeiro
  const n = pts.length;
  // cantos = junções onde a direção muda mais de 32°
  const corner = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    if (!jn[i]) continue;
    const hasPrev = sub.closed || i > 0, hasNext = sub.closed || i < n - 1;
    if (!hasPrev || !hasNext) { corner[i] = true; continue; }
    const a = pts[i], p = pts[(i - 1 + n) % n], q = pts[(i + 1) % n];
    corner[i] = angleBetween([a[0] - p[0], a[1] - p[1]], [q[0] - a[0], q[1] - a[1]]) > 32;
  }
  if (!sub.closed) {
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    const idx = corner.map((c, i) => (c ? i : -1)).filter((i) => i >= 0);
    for (let c = 0; c < idx.length - 1; c++) d += spanBez(pts.slice(idx[c], idx[c + 1] + 1));
    return d;
  }
  const first = corner.indexOf(true);
  if (first < 0) return `M${f1(pts[0][0])} ${f1(pts[0][1])}${cyclicBez(pts)}Z`;
  const rot = pts.slice(first).concat(pts.slice(0, first)), rc = corner.slice(first).concat(corner.slice(0, first));
  rot.push(rot[0]); rc.push(true);
  let d = `M${f1(rot[0][0])} ${f1(rot[0][1])}`;
  const idx = rc.map((c, i) => (c ? i : -1)).filter((i) => i >= 0);
  for (let c = 0; c < idx.length - 1; c++) d += spanBez(rot.slice(idx[c], idx[c + 1] + 1));
  return d + "Z";
}

const DEFAULT = { step: 14, amp: 1.5, freq: 0.03 };
function bake(d, opt = {}) {
  const o = { ...DEFAULT, ...opt };
  return parse(d).map((s) => bakeSub(s, o)).join("");
}
function translate(d, dx, dy) {
  return d.replace(/(-?\d*\.?\d+)[ ,](-?\d*\.?\d+)/g, (_, x, y) => `${parseFloat(x) + dx} ${parseFloat(y) + dy}`);
}
function ellipse(cx, cy, rx, ry, rotDeg) {
  const k = 0.5522847498, a = (rotDeg * Math.PI) / 180, cos = Math.cos(a), sin = Math.sin(a);
  const R = ([x, y]) => [cx + x * cos - y * sin, cy + x * sin + y * cos];
  const P = [[rx, 0], [rx, k * ry], [k * rx, ry], [0, ry], [-k * rx, ry], [-rx, k * ry], [-rx, 0], [-rx, -k * ry], [-k * rx, -ry], [0, -ry], [k * rx, -ry], [rx, -k * ry], [rx, 0]].map(R);
  let d = `M${P[0][0].toFixed(2)} ${P[0][1].toFixed(2)}`;
  for (let i = 1; i < P.length; i += 3) d += `C${P[i].map((v) => v.toFixed(2)).join(" ")} ${P[i + 1].map((v) => v.toFixed(2)).join(" ")} ${P[i + 2].map((v) => v.toFixed(2)).join(" ")}`;
  return d + "Z";
}

/* ---------------- desenho original (viewBox 460 x 620) ---------------- */
const GLASS = "M138 178 L156 468 Q157 486 174 486 L286 486 Q303 486 304 468 L322 178";
const SRC = {
  offset: bake(translate(GLASS + "Z", 9, 9)),
  glassBody: bake(GLASS + "Z"),
  glassLine: bake(GLASS),
  rim: bake("M133 180 H327"),
  wall: bake("M149 186 L165 462 Q166 474 178 474 L282 474 Q294 474 295 462 L311 186"),
  highlights: ["M160 198 L166 290", "M173 356 L176 442", "M291 362 L289 430"].map((d) => bake(d, { step: 20 })),
  // camadas de líquido (o leite fica ATRÁS do café; os dois são recortados pelo copo)
  coffee: bake("M126 328 C160 314 188 340 230 330 S302 316 334 328 L334 506 L126 506 Z", { step: 18 }),
  milk: bake("M126 186 C165 177 195 193 230 185 S300 177 334 186 L334 506 L126 506 Z", { step: 18 }),
  crema: bake("M126 328 C160 314 188 340 230 330 S302 316 334 328", { step: 18 }),
  foam: bake("M140 180 C138 162 156 152 176 158 C186 142 214 140 226 154 C240 140 268 142 278 158 C298 150 322 162 320 180 Z", { step: 12 }),
  foamLine: bake("M178 168 C190 162 200 163 208 169", { step: 12 }),
  eyeL: bake("M184 248 Q198 232 212 248", { step: 10 }),
  eyeR: bake("M248 248 Q262 232 276 248", { step: 10 }),
  mouth: bake("M214 272 Q230 288 246 272", { step: 10 }),
  armLeft: bake("M146 304 C106 312 82 286 78 248"),
  hand: bake("M64 238 C62 226 70 218 78 218 C88 218 94 226 92 238 C90 248 66 248 64 238 Z", { step: 9 }),
  fingers: bake("M68 219 L61 200 M76 216 L73 192 M85 216 L88 194 M92 222 L103 205", { amp: 1 }),
  motion: bake("M44 218 Q36 232 44 246", { step: 10 }),
  armRight: bake("M322 304 C374 302 396 342 360 374 C342 388 322 388 312 382"),
  legL: bake("M192 486 C192 514 184 532 174 548"),
  legR: bake("M268 486 C268 512 278 528 292 540"),
  shoeL: bake(ellipse(160, 558, 27, 10, -8), { step: 12 }),
  shoeR: bake(ellipse(311, 549, 27, 10, 14), { step: 12 }),
  steam: ["M204 134 C186 114 222 102 206 80 C196 66 210 54 220 44", "M256 138 C272 122 246 110 260 92"].map((d) => bake(d, { step: 12 })),
  // fios de café e de leite caindo de cima da tela (começam bem acima do desenho)
  pourCoffee: bake("M227 -430 C225 -260 231 -60 228 474", { step: 26, amp: 2.6, freq: 0.02 }),
  pourMilk: bake("M262 -430 C265 -260 258 -60 261 420", { step: 26, amp: 2.6, freq: 0.02 }),
};
// setas das anotações (viewBox 90 x 60)
const ARROW = { amp: 0.8, freq: 0.08, step: 8 };
const ARROWS = {
  up: { line: bake("M82 4 C70 36 40 46 10 40", ARROW), head: bake("M22 28 L8 40 L24 50", { ...ARROW, step: 12 }) },
  down: { line: bake("M82 56 C70 24 40 14 10 20", ARROW), head: bake("M22 32 L8 20 L24 10", { ...ARROW, step: 12 }) },
};

const out = `// ARQUIVO GERADO por scripts/bake-pingado.mjs — não edite à mão.
// Desenho do Pingado (viewBox ${460} x ${620}) com o "tremido de mão" já calculado nos paths.

export const PINGADO_VIEWBOX = "0 0 460 620";

export const pingadoArt = ${JSON.stringify(SRC, null, 2)} as const;

/** setas das anotações front-end / back-end (viewBox "0 0 90 60") */
export const arrowArt = ${JSON.stringify(ARROWS, null, 2)} as const;
`;
const target = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "components", "pingado-art.ts");
writeFileSync(target, out);
const bytes = Buffer.byteLength(out);
console.log("ok:", target, bytes, "bytes");
