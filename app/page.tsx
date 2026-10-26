
import Link from "next/link";
import { searchTodosAction } from "./actions/search-todos";
import { fetchTodos } from "./lib/todo";
import TodoBulkList from "./components/todo-bulk-list";

interface HomeProps {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const q = params.q ?? "";

  const status =
    params.status === "completed" ||
    params.status === "pending"
      ? params.status
      : "all";

  const todos = await fetchTodos({
    search: q,
    status,
  });

  const time = new Date().toLocaleTimeString();

  return (
    <main className="max-w-4xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📝 Todo App
        </h1>

        <p className="text-sm text-gray-500 mb-4">
          Last updated: {time}
        </p>

        <div className="mb-6">
          <Link
            href="/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ➕ Add New Todo
          </Link>
        </div>

        {/* Search iyo Filter */}
        <form
          action={searchTodosAction}
          className="mb-6 space-y-4 rounded-lg border border-gray-200 p-4"
        >
          <div>
            <label
              htmlFor="q"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search by title
            </label>

            <input
              id="q"
              name="q"
              type="search"
              defaultValue={q}
              maxLength={200}
              placeholder="Search your todos..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Completion Status
            </label>

            <select
              id="status"
              name="status"
              defaultValue={status}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Todos</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              🔎 Search & Filter
            </button>

            <Link
              href="/"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Clear
            </Link>
          </div>
        </form>

        {/* Tirada natiijooyinka */}
        <p className="text-sm text-gray-500 mb-3">
          Results: {todos.length}
        </p>

        {/* Liiska Todo-yada iyo Bulk Operations */}
        <TodoBulkList todos={todos} />
      </div>
    </main>
  );
}
