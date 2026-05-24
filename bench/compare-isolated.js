/**
 * Comparative benchmark: original vs @flupke — runs each test in isolation
 * to avoid inline cache pollution between implementations.
 */
'use strict';
const { execSync } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function runIsolated(code) {
  const result = execSync(`node -e "${code.replace(/"/g, '\\"')}"`, {
    cwd: root, encoding: 'utf8', timeout: 30000
  });
  return result.trim();
}

function bench(label, setupOrig, setupFlupke, testCode, iterations = 5_000_000) {
  const template = (setup, iter) => `
    const {performance}=require('node:perf_hooks');
    ${setup}
    for(let i=0;i<10000;i++){${testCode}}
    const N=${iter};const s=performance.now();
    for(let i=0;i<N;i++){${testCode}}
    const e=performance.now()-s;
    process.stdout.write(JSON.stringify({ops:Math.round(N/e*1000),ms:e.toFixed(1)}));
  `.replace(/\n/g, '');

  const orig = JSON.parse(runIsolated(template(setupOrig, iterations)));
  const flup = JSON.parse(runIsolated(template(setupFlupke, iterations)));
  const pct = ((flup.ops / orig.ops - 1) * 100).toFixed(1);
  const symbol = pct >= -2 ? '✓' : '⚠';

  console.log(`${symbol} ${label}`);
  console.log(`  Original: ${orig.ops.toLocaleString()} ops/sec (${orig.ms}ms)`);
  console.log(`  @flupke:  ${flup.ops.toLocaleString()} ops/sec (${flup.ms}ms)`);
  console.log(`  Δ: ${pct > 0 ? '+' : ''}${pct}%\n`);
  return { label, origOps: orig.ops, flupkeOps: flup.ops, pct };
}

console.log('=== ISOLATED BENCHMARKS (no IC pollution) ===\n');

const results = [];

results.push(bench('isarray',
  `const fn=require('isarray');const inputs=[[],[1,2,3],{},null,'hi',42];`,
  `const fn=require('./packages/is-array/src/index.js');const inputs=[[],[1,2,3],{},null,'hi',42];`,
  `for(const x of inputs)fn(x);`
));

results.push(bench('ms (parse)',
  `const fn=require('ms');`,
  `const fn=require('./packages/ms/src/index.js');`,
  `fn('2 days');fn('1h');fn('500ms');`
));

results.push(bench('ms (format)',
  `const fn=require('ms');`,
  `const fn=require('./packages/ms/src/index.js');`,
  `fn(86400000);fn(3600000);fn(500);`
));

results.push(bench('ms (format long)',
  `const fn=require('ms');`,
  `const fn=require('./packages/ms/src/index.js');`,
  `fn(86400000,{long:true});fn(3600000,{long:true});`
));

results.push(bench('safe-buffer',
  `const B=require('safe-buffer').Buffer;`,
  `const B=require('./packages/safe-buffer/src/index.js').Buffer;`,
  `B.from('hello world');`
));

results.push(bench('inherits',
  `const fn=require('inherits');`,
  `const fn=require('./packages/inherits/src/index.js');`,
  `function A(){}function B(){}fn(B,A);`
));

results.push(bench('function-bind',
  `const fn=require('function-bind');const f=function(a,b){return this.x+a+b};const c={x:1};`,
  `const fn=require('./packages/function-bind/src/index.js');const f=function(a,b){return this.x+a+b};const c={x:1};`,
  `fn.call(f,c,2,3)();`
));

// Summary
console.log('=== SUMMARY ===\n');
console.log('| Package | Original | @flupke | Δ |');
console.log('|---------|----------|---------|---|');
for (const r of results) {
  console.log(`| ${r.label} | ${r.origOps.toLocaleString()} | ${r.flupkeOps.toLocaleString()} | ${r.pct > 0 ? '+' : ''}${r.pct}% |`);
}
