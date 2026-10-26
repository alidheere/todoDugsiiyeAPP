"use client";

import {  useState } from "react"

export function Counter() {
 const [count, setCount] = useState(0);
  // const now = new Date().toLocaleTimeString();
  return (
    <>
  <h2> Counter</h2>
  <p>Count: {count}</p>
  <button  className="bg-blue-500 text-white p-2 rounded-md" onClick={() => setCount(count + 1)}>Increment</button>
  <button  className="bg-blue-500 text-white p-2 rounded-md" onClick={() => setCount(count - 1)}>Decrement</button>
  <button  className="bg-blue-500 text-white p-2 rounded-md" onClick={() => setCount(0)}>Reset</button>
  </>
  );
}
