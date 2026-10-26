
'use client';

import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { updateTodoAction } from '../actions/update';
import type { TodoFormState, TodoPriority } from '../types/todo';

interface EditTodoFormProps {
  todoId: string;
  initialTitle: string;
  initialPriority: TodoPriority;
}

export default function EditTodoForm({
  todoId,
  initialTitle,
  initialPriority,
}: EditTodoFormProps) {
  const initialState: TodoFormState = {
    status: 'idle',
    message: '',
    values: {
      title: initialTitle,
      priority: initialPriority,
    },
  };

  const [state, formAction, isPending] = useActionState(
    updateTodoAction,
    initialState
  );

  const [title, setTitle] = useState(initialTitle);
  const [priority, setPriority] = useState<TodoPriority>(initialPriority);

  useEffect(() => {
    if (state.status === 'error') {
      setTitle(state.values.title);
      setPriority(state.values.priority);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={todoId} />

      <div>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          maxLength={200}
          autoFocus
        />

        <p className="text-xs text-gray-500 mt-1">
          Maximum 200 characters
        </p>
      </div>

      <div>
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
          className={`text-sm ${
            state.status === 'error' ? 'text-red-600' : 'text-green-700'
          }`}
        >
          {state.message}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
        >
          {isPending ? 'Updating...' : 'Update Todo'}
        </button>

        <Link
          href="/"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
