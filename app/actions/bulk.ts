
"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { getTodoCollection } from "../lib/db";

function getValidIds(formData: FormData): ObjectId[] {
  const values = formData.getAll("ids");

  const ids = values.filter(
    (value): value is string => typeof value === "string"
  );

  const uniqueIds = [...new Set(ids)];

  // Ka hortag codsiyo leh IDs aad u badan
  if (uniqueIds.length === 0 || uniqueIds.length > 500) {
    return [];
  }

  if (!uniqueIds.every((id) => ObjectId.isValid(id))) {
    return [];
  }

  return uniqueIds.map((id) => new ObjectId(id));
}

// Tirtir Todo-yo badan
export async function bulkDeleteTodosAction(
  formData: FormData
): Promise<void> {
  const ids = getValidIds(formData);

  if (ids.length === 0) {
    return;
  }

  const collection = await getTodoCollection();

  await collection.deleteMany({
    _id: { $in: ids },
  });

  revalidatePath("/");
}

// Dhammeystir ama dib u fur Todo-yo badan
export async function bulkSetCompletionAction(
  formData: FormData
): Promise<void> {
  const ids = getValidIds(formData);
  const completedValue = formData.get("completed");

  if (
    ids.length === 0 ||
    (completedValue !== "true" && completedValue !== "false")
  ) {
    return;
  }

  const completed = completedValue === "true";
  const collection = await getTodoCollection();

  await collection.updateMany(
    {
      _id: { $in: ids },
    },
    {
      $set: {
        completed,
        updatedAt: new Date(),
      },
    }
  );

  revalidatePath("/");
}
