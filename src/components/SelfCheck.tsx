import { useState } from 'react';

const questions = [
  { prompt: 'What changed when you increased depth?', options: ['The hidden state received more recurrent updates', 'The system generated a longer explanation'], correct: 0 },
  { prompt: 'What role did BFS play?', options: ['It supplied hidden hints to inference', 'It independently evaluated the estimate'], correct: 1 },
  { prompt: 'What did the limitation show?', options: ['Additional computation can saturate', 'More updates always make an answer worse'], correct: 0 },
] as const;

export function SelfCheck() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answered = Object.keys(answers).length;
  const correct = Object.entries(answers).filter(([index, answer]) => questions[Number(index)]?.correct === answer).length;
  return (
    <section className="self-check" aria-labelledby="self-check-title">
      <div className="section-kicker">Explain it back</div>
      <h2 id="self-check-title">Three checks, no score sent anywhere</h2>
      <div className="question-grid">
        {questions.map((question, index) => (
          <fieldset key={question.prompt}>
            <legend><span>{index + 1}</span>{question.prompt}</legend>
            {question.options.map((option, optionIndex) => (
              <button type="button" aria-pressed={answers[index] === optionIndex} className={answers[index] === optionIndex ? 'is-selected' : ''} key={option} onClick={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))}>{option}</button>
            ))}
          </fieldset>
        ))}
      </div>
      <p className="self-check-result" role="status">{answered < 3 ? `${answered} of 3 answered.` : `${correct} of 3 correct. ${correct === 3 ? 'Repeated hidden-state updates add computation, BFS only evaluates, and extra updates can plateau.' : 'Revisit the live estimate, reference note, and limitation plateau.'}`}</p>
      <label className="explain-back">In one sentence, explain the result in your own words.<textarea rows={3} placeholder="Extra recurrent updates can … but they do not guarantee …" /></label>
    </section>
  );
}
