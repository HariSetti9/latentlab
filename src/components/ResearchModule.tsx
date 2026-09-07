import { useMemo, useState } from 'react';
import { depthMattersPreset } from '../core/presets';
import { runExperiment } from '../core/trace';
import { comparisonRows } from '../research/comparisons';
import { researchClaims } from '../research/claims';
import { paperById, papers } from '../research/papers';

const depths = [2, 4, 6, 8] as const;

export function ResearchModule() {
  const [mappingDepth, setMappingDepth] = useState<number>(4);
  const result = useMemo(() => runExperiment(depthMattersPreset, mappingDepth), [mappingDepth]);
  const finalStep = result.steps.at(-1);
  if (!finalStep) throw new Error('Research mapping experiment returned no steps.');
  const reachedCells = finalStep.state.flat().filter((value) => value >= 0).length;

  return (
    <section className="research-module" id="evidence" aria-labelledby="research-title">
      <div className="research-intro">
        <div><div className="section-kicker">Published systems · evidence-aware</div><h2 id="research-title">Where the toy connects—and where it stops.</h2></div>
        <p>The shared idea is repeated internal computation before an answer is read. The implementation, state, training, and task are different.</p>
      </div>

      <aside className="non-equivalence" aria-label="Non-equivalence warning"><strong>Conceptual bridge, not a replica.</strong> LATENTLAB is not BDH or BDH-CQ. It has no learned weights, in-context learning, latent neural workspace, language model, or ARC evaluation.</aside>

      <div className="research-map">
        <div className="mapping-control">
          <div className="section-kicker">Try the bridge</div>
          <h3>Change transparent toy depth</h3>
          <div className="depth-options" aria-label="Concept mapping depth">{depths.map((value) => <button key={value} className={mappingDepth === value ? 'is-selected' : ''} aria-label={`Toy concept mapping depth ${value}`} aria-pressed={mappingDepth === value} onClick={() => setMappingDepth(value)}>{value}</button>)}</div>
          <p>After {mappingDepth} updates, the toy has reached <strong>{reachedCells} cells</strong> and the goal is <strong>{finalStep.prediction.reachable ? 'reached' : 'not yet reached'}</strong>.</p>
          <small>This control reruns the toy only. It does not select, estimate, or simulate BDH-CQ depth.</small>
        </div>
        <figure className="architecture-diagram">
          <figcaption>Original simplified mechanism map</figcaption>
          <div className="diagram-lanes">
            <div><span>Explicit-token route</span><b>Prompt</b><i>→</i><b>words → words</b><i>→</i><b>answer</b><small>Intermediate tokens are emitted.</small></div>
            <div className="diagram-toy"><span>LATENTLAB toy</span><b>Grid</b><i>→</i><b>state ↻ × {mappingDepth}</b><i>→</i><b>estimate</b><small>Fixed rules; every state is inspectable.</small></div>
            <div className="diagram-published"><span>BDH-CQ, as described</span><b>Demos → memory</b><i>→</i><b>workspace ↻</b><i>→</i><b>answer</b><small>Learned system; exact updates are proprietary. <a href={paperById.S4.url} target="_blank" rel="noreferrer" aria-label="Read BDH-CQ primary paper, opens in a new tab">[S4]</a></small></div>
          </div>
        </figure>
      </div>

      <div className="compute-paths">
        <div><span className="evidence-badge evidence-concept">Conceptual comparison</span><h3>Two ways to spend more inference compute</h3></div>
        <article><strong>Emit more intermediate tokens</strong><p>The visible sequence grows as the model produces additional textual steps.</p></article>
        <article><strong>Repeat internal updates</strong><p>A recurrent state is updated before decoding. Recurrent-depth models, Coconut, and BDH-CQ explore distinct versions of this broad direction <CitationList ids={['S1', 'S2', 'S4']} />.</p></article>
      </div>

      <div className="research-section-heading"><div className="section-kicker">Mechanism comparison</div><h3>Same vocabulary does not mean same machine.</h3></div>
      <div className="table-scroll"><table className="comparison-table"><caption>LATENTLAB compared with published BDH and BDH-CQ descriptions</caption><thead><tr><th>Dimension</th><th>LATENTLAB toy</th><th>BDH <a href={paperById.S3.url} target="_blank" rel="noreferrer" aria-label="Read BDH primary paper, opens in a new tab">[S3]</a></th><th>BDH-CQ <a href={paperById.S4.url} target="_blank" rel="noreferrer" aria-label="Read BDH-CQ primary paper, opens in a new tab">[S4]</a></th></tr></thead><tbody>{comparisonRows.map((row) => <tr key={row.dimension}><th>{row.dimension}</th><td>{row.toy}</td><td>{row.bdh}</td><td>{row.bdhCq}</td></tr>)}</tbody></table></div>

      <div className="evidence-panel">
        <div><div className="section-kicker">Evidence status</div><h3>What you can trust—and how far.</h3></div>
        <div className="evidence-cards"><article><span className="evidence-badge evidence-live">Our experiment</span><p>The recurrence, trace, BFS oracle, and tests run in this repository. This supports claims about this toy.</p></article><article><span className="evidence-badge evidence-published">Author-reported preprint</span><p>BDH and BDH-CQ mechanisms and results come from their authors’ papers. We did not reproduce their models or ARC result.</p></article><article><span className="evidence-badge evidence-concept">Not independently reproduced</span><p>No unrelated third-party reproduction of BDH or BDH-CQ was identified in this review. BDH-CQ reports a black-box audit involving paper co-authors; we do not relabel that as unrelated replication.</p></article></div>
      </div>

      <div className="claim-list"><div><div className="section-kicker">Claims with boundaries</div><h3>Three defensible takeaways</h3></div>{researchClaims.map((claim) => <article key={claim.id}><span className="evidence-badge evidence-published">{claim.evidence}</span><p>{claim.text} <CitationList ids={[...claim.sourceIds]} /></p><small>{claim.caveat}</small></article>)}</div>

      <div className="references"><div className="section-kicker">Primary sources reviewed in full</div>{papers.map((paper) => <article key={paper.id}><div><span>{paper.id} · {paper.year}</span><h3>{paper.shortName}</h3></div><p><a href={paper.url} target="_blank" rel="noreferrer">{paper.title}<span className="sr-only"> (opens in a new tab)</span></a></p><small><strong>Why cite:</strong> {paper.whyCite}<br /><strong>Reviewed:</strong> {paper.reviewedSections}</small></article>)}</div>
    </section>
  );
}

function CitationList({ ids }: { ids: (keyof typeof paperById)[] }) {
  return <>{ids.map((id) => <a className="citation" key={id} href={paperById[id].url} target="_blank" rel="noreferrer" aria-label={`Read source ${id}: ${paperById[id].title}, opens in a new tab`}>[{id}]</a>)}</>;
}
