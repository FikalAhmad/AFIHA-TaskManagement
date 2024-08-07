"use server";
import db from "@/lib/db";

// * READ
export const getTaskData = async (id: string) => {
  return await db.task.findMany({
    where: { userId: id },
    include: {
      subtask: true,
      list: true,
      tags: true,
    },
  });
};

export const getTaskDataById = async (id: string) => {
  return await db.task.findFirst({
    where: { id },
    include: {
      subtask: true,
      list: true,
      tags: true,
    },
  });
};

// * CREATE
export const AddTaskData = async (
  title: string,
  description: string,
  userId: string
) => {
  try {
    await db.task.create({
      data: {
        title,
        description,
        userId,
      },
    });
    console.log("Task created successfully");
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};

export const UpdateTaskData = async (
  id: string,
  title: string,
  description: string,
  lists: string[],
  tags: string
) => {
  try {
    await db.task.update({
      where: { id },
      data: {
        title,
        description,
        list: {
          set: lists.map((listId) => ({ id: listId })),
        },
        tags,
      },
    });
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
};
