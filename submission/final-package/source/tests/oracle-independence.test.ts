import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('oracle and recurrent-engine separation', () => {
  it('keeps the recurrent engine free of oracle imports and traversal structures', async () => {
    const source = await readFile(join(process.cwd(), 'src/core/recurrent-engine.ts'), 'utf8');
    expect(source).not.toMatch(/from ['"].*oracle/);
    expect(source).not.toMatch(/solveWithBfs|shortestPath|shortestDistance|predecessor|queue/);
  });

  it('keeps BFS in the experiment evaluator rather than the update function', async () => {
    const trace = await readFile(join(process.cwd(), 'src/core/trace.ts'), 'utf8');
    expect(trace).toContain("import { solveWithBfs } from './oracle'");
    expect(trace.indexOf('const oracle = solveWithBfs(puzzle)')).toBeLessThan(trace.indexOf('for (let step = 1'));
  });
});
