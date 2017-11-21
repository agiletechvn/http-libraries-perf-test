# HTTP libraries performance test

My results:
```bash
➜  http-libraries-perf-test git:(master) ✗ node index.js
http.request POST request x 7,555 ops/sec ±2.28% (73 runs sampled)
http.request GET request x 7,995 ops/sec ±1.69% (72 runs sampled)
node-fetch POST request x 4,599 ops/sec ±3.04% (70 runs sampled)
node-fetch GET request x 4,741 ops/sec ±3.38% (78 runs sampled)
axios GET request x 3,257 ops/sec ±2.89% (71 runs sampled)
axios POST request x 3,252 ops/sec ±2.77% (69 runs sampled)
superagent GET request x 513 ops/sec ±173.13% (68 runs sampled)
superagent POST request x 4,479 ops/sec ±3.52% (69 runs sampled)
Request GET request x 3,188 ops/sec ±2.90% (70 runs sampled)
Request POST request x 2,684 ops/sec ±2.85% (67 runs sampled)
Fastest is http.request GET request
```

I'm not suprised that bare `http.request` is the fastest. But I can't explain why `axios` and `request` are so slow.
