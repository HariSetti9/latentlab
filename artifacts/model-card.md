# LATENTLAB Toy Recurrent Substrate Model Card

## Summary

Version 0.1 is a parameter-free synchronous grid recurrence for teaching repeated latent-state computation. “Model” here means a mathematical computational model, not a trained neural network.

## Intended use

Interactive education on recurrent depth, inspectable hidden state, independent evaluation, and saturation. Small rectangular four-neighbor mazes only.

## Not intended for

Language reasoning, planning claims beyond these grids, probability/confidence, benchmark comparison, safety-critical routing, or representation of BDH/BDH-CQ behavior.

## Inputs and outputs

Input is a validated binary grid plus start/goal and a non-negative integer depth. Output is a complete JSON-serializable state trace and a goal-cell reachability/distance estimate. BFS reference output is attached by the experiment runner but never consumed by inference.

## Parameters and training

No learned parameters, weights, dataset, training, seed, or checkpoint. State updates use the fixed rule documented in `docs/COMPUTATIONAL_SUBSTRATE.md`.

## Evaluation

Committed presets are swept over depths 0, 1, 2, 4, 6, 8, and 16. Unit tests cover validation, oracle correctness, recurrence semantics, deterministic serialization, non-mutation, preset outcomes, trace shape, and plateau behavior.

## Limitations

The recurrence is specialized and algorithmic. Its transparency is pedagogically useful but says nothing about learned latent representations, general intelligence, or biological plausibility.
