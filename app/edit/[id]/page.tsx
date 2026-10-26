import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchTodoById } from '../../lib/todo';
import EditTodoForm from '../../components/edit-todo-form';


interface EditTodoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { id } = await params;
  const todo = await fetchTodoById(id);

  if (!todo) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Todo</h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Todos
          </Link>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Status:</span> {todo.completed ? 'Completed' : 'Pending'}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Created:</span> {new Date(todo.createdAt).toLocaleDateString()}
            </p>
            {todo.updatedAt && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Last updated:</span> {new Date(todo.updatedAt).toLocaleDateString()}
              </p>
            )}
          </div>

     <EditTodoForm
  todoId={todo._id}
  initialTitle={todo.title}
  initialPriority={todo.priority}
/>
        </div>
      </div>
    </main>
  );
}
