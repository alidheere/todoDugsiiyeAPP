
'use client';

import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { createTodoAction } from '../actions/create';
import type { TodoFormState, TodoPriority } from '../types/todo';

const initialState: TodoFormState = {
  status: 'idle',
  message: '',
  values: {
    title: '',
    priority: 'medium',
  },
};

export default function CreateTodoForm() {
  const [state, formAction, isPending] = useActionState(
    createTodoAction,
    initialState
  );

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TodoPriority>('medium');

  useEffect(() => {
    if (state.status === 'success') {
      setTitle('');
      setPriority('medium');
    } else if (state.status === 'error') {
      setTitle(state.values.title);
      setPriority(state.values.priority);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Todo Title
        </label>

        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter your todo..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          maxLength={200}
          autoFocus
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Priority Level
        </label>

        <select
          id="priority"
          name="priority"
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as TodoPriority)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      {state.status !== 'idle' && (
        <p
          role={state.status === 'error' ? 'alert' : 'status'}
          className={`mt-2 text-sm ${
            state.status === 'error'
              ? 'text-red-600'
              : 'text-green-700'
          }`}
        >
          {state.message}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-blue-600 my-2 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors disabled:opacity-50"
        >
          {isPending ? 'Creating...' : 'Create Todo'}
        </button>

        <Link
          href="/"
          className="px-4 py-2 border my-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
