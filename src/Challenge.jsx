import { useState } from "react";

// function App() {
//   return (
//     <div className="App">
//       <Counter />
//     </div>
//   );
// }
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div>
      <div>
        <button onClick={() => setStep((c) => c - 1)}>-</button>
        {/* <span>Step: {step}</span> */}
        <input
          type="range"
          value={step}
          min="0"
          max="10"
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>{step}</span>
        <button onClick={() => setStep((c) => c + 1)}>+</button>
      </div>

      <div>
        <button onClick={() => setCount((c) => Number(c) - step)}>-</button>
        {/* <span>Count: {count}</span> */}
        <input
          type="text"
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
        />
        <button onClick={() => setCount((c) => Number(c) + step)}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>

      {count == 0 && step == 1 ? null : (
        <button
          onClick={() => {
            setCount(0);
            setStep(1);
          }}
        >
          reset
        </button>
      )}
    </div>
  );
}

export default Counter;
