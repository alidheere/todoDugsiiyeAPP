
'use server';

import { revalidatePath } from 'next/cache';
import { updateTodo, fetchTodoById } from '../lib/todo';
import type { TodoFormState, TodoPriority } from '../types/todo';

const validPriorities: TodoPriority[] = ['low', 'medium', 'high'];

export async function updateTodoAction(
  _previousState: TodoFormState,
  formData: FormData
): Promise<TodoFormState> {
  const idValue = formData.get('id');
  const id = typeof idValue === 'string' ? idValue : '';

  const titleValue = formData.get('title');
  const inputTitle = typeof titleValue === 'string' ? titleValue : '';
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

  if (!id) {
    return {
      status: 'error',
      message: 'Todo ID is required.',
      values,
    };
  }

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

  const existingTodo = await fetchTodoById(id);

  if (!existingTodo) {
    return {
      status: 'error',
      message: 'Todo not found.',
      values,
    };
  }

  const success = await updateTodo(id, {
    title,
    priority,
  });

  if (!success) {
    // Haddii xogtu is beddelin, MongoDB wuxuu soo celin karaa
    // modifiedCount = 0. Hubi in Todo-gu weli jiro.
    const todoStillExists = await fetchTodoById(id);

    if (!todoStillExists) {
      return {
        status: 'error',
        message: 'Todo not found.',
        values,
      };
    }

    if (
      todoStillExists.title !== title ||
      todoStillExists.priority !== priority
    ) {
      return {
        status: 'error',
        message: 'Unable to update the todo. Please try again.',
        values,
      };
    }
  }

  revalidatePath('/');
  revalidatePath(`/edit/${id}`);

  return {
    status: 'success',
    message: 'Todo updated successfully.',
    values: {
      title,
      priority,
    },
  };
}
