
'use server';

import { revalidatePath } from 'next/cache';
import { createTodo } from '../lib/todo';
import type { TodoFormState, TodoPriority } from '../types/todo';

const validPriorities: TodoPriority[] = ['low', 'medium', 'high'];

export async function createTodoAction(
  _previousState: TodoFormState,
  formData: FormData
): Promise<TodoFormState> {
  const fieldValue = formData.get('title');
  const inputTitle =
    typeof fieldValue === 'string' ? fieldValue : '';
  const title = inputTitle.trim();

  const priorityValue = formData.get('priority');

  const priority: TodoPriority =
    typeof priorityValue === 'string' &&
    validPriorities.includes(priorityValue as TodoPriority)
      ? (priorityValue as TodoPriority)
      : 'medium';

  const values = {
    title: inputTitle,
    priority,
  };

  if (!title) {
    return {
      status: 'error',
      message: 'Title is required.',
      values,
    };
  }

  if (inputTitle.length > 200) {
    return {
      status: 'error',
      message: 'Title must be 200 characters or fewer.',
      values,
    };
  }

  const todoId = await createTodo({ title, priority });

  if (!todoId) {
    return {
      status: 'error',
      message: 'Unable to create the todo. Please try again.',
      values,
    };
  }

  revalidatePath('/');

  return {
    status: 'success',
    message: 'Todo created successfully.',
    values: {
      title: '',
      priority: 'medium',
    },
  };
}
