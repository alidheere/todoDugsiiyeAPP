import Link from 'next/link'
import CreateTodoForm from '../components/create-todo-form';


export default function NewTodo() {
    return (
        <main className="max-w-2xl mx-auto mt-10 p-6">

            <div className="bg-white rounded-lg shadow-md p-6">

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Add New Todo</h1>
                    <Link
                        href="/"
                        className="text-rose-600 hover:text-rose-800 transition-colors"
                    >
                        ← Back to Todos
                    </Link>
                </div>

                <CreateTodoForm />

            </div>

        </main>
    )
}