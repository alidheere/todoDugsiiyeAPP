
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Todo } from "../types/todo";
import { toggleTodo } from "../actions/toggle";
import { deleteTodo } from "../actions/delate";
import { bulkDeleteTodosAction, bulkSetCompletionAction } from "../actions/bulk";
import RelativeTime from "./relative-time";

type TodoBulkListProps = {
  todos: Todo[];
};

export default function TodoBulkList({ todos }: TodoBulkListProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const visibleIds = new Set(todos.map((todo) => todo._id));

    setSelectedIds((currentIds) =>
      currentIds.filter((id) => visibleIds.has(id))
    );
  }, [todos]);

  const allSelected =
    todos.length > 0 &&
    todos.every((todo) => selectedIds.includes(todo._id));

  function toggleSelection(id: string, checked: boolean) {
    setSelectedIds((currentIds) => {
      if (checked) {
        return currentIds.includes(id)
          ? currentIds
          : [...currentIds, id];
      }

      return currentIds.filter((currentId) => currentId !== id);
    });
  }

  function selectAll(checked: boolean) {
    setSelectedIds(checked ? todos.map((todo) => todo._id) : []);
  }

  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

  const sortedTodos = [...todos].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <div>
      <div className="mb-5 rounded-lg border border-gray-200 p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(event) => selectAll(event.target.checked)}
              disabled={todos.length === 0}
              className="h-4 w-4 rounded"
            />
            Select All
          </label>

          <span className="text-sm text-gray-500">
            Selected: {selectedIds.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <form action={bulkSetCompletionAction}>
            {selectedIds.map((id) => (
              <input key={id} type="hidden" name="ids" value={id} />
            ))}
            <input type="hidden" name="completed" value="true" />

            <button
              type="submit"
              disabled={selectedIds.length === 0}
              className="rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ✓ Mark Complete
            </button>
          </form>

          <form action={bulkSetCompletionAction}>
            {selectedIds.map((id) => (
              <input key={id} type="hidden" name="ids" value={id} />
            ))}
            <input type="hidden" name="completed" value="false" />

            <button
              type="submit"
              disabled={selectedIds.length === 0}
              className="rounded-md bg-yellow-600 px-3 py-2 text-sm text-white hover:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ↩ Mark Incomplete
            </button>
          </form>

          <form
            action={bulkDeleteTodosAction}
            onSubmit={(event) => {
              if (
                !window.confirm(
                  `Ma hubtaa inaad tirtirayso ${selectedIds.length} Todo?`
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            {selectedIds.map((id) => (
              <input key={id} type="hidden" name="ids" value={id} />
            ))}

            <button
              type="submit"
              disabled={selectedIds.length === 0}
              className="rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              🗑️ Delete Selected
            </button>
          </form>
        </div>
      </div>

      {todos.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-lg text-gray-500">No todos found.</p>
          <p className="mt-2 text-sm text-gray-400">
            Try another search or create a new todo.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedTodos.map((todo) => (
            <div
              key={todo._id}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex min-w-0 items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(todo._id)}
                  onChange={(event) =>
                    toggleSelection(todo._id, event.target.checked)
                  }
                  aria-label={`Select ${todo.title}`}
                  className="mt-1 h-4 w-4 shrink-0 rounded"
                />

                <form action={toggleTodo.bind(null, todo._id)}>
                  <button
                    type="submit"
                    className="text-2xl transition-transform hover:scale-110"
                    title={
                      todo.completed
                        ? "Mark as incomplete"
                        : "Mark as complete"
                    }
                  >
                    {todo.completed ? "✅" : "⬜"}
                  </button>
                </form>

                <div className="min-w-0">
                  <span
                    className={`text-lg ${
                      todo.completed
                        ? "text-gray-500 line-through"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.title}
                  </span>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">
                      Priority Level:
                    </span>

                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                        todo.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : todo.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {todo.priority.toUpperCase()}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-col gap-1 text-xs text-gray-500">
                    <RelativeTime
                      date={todo.createdAt}
                      prefix="Created"
                    />

                    {todo.updatedAt && (
                      <RelativeTime
                        date={todo.updatedAt}
                        prefix="Updated"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center space-x-2">
                <Link
                  href={`/edit/${todo._id}`}
                  className="rounded-md p-2 text-blue-600 transition-colors hover:bg-blue-100"
                  title="Edit todo"
                >
                  ✏️
                </Link>

                <form
                  action={deleteTodo.bind(null, todo._id)}
                  onSubmit={(event) => {
                    if (
                      !window.confirm(
                        `Ma hubtaa inaad tirtirayso "${todo.title}"?`
                      )
                    ) {
                      event.preventDefault();
                    }
                  }}
                >
                  <button
                    type="submit"
                    className="rounded-md p-2 text-red-600 transition-colors hover:bg-red-100"
                    title="Delete todo"
                  >
                    🗑️
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
