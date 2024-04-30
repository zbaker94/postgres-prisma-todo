"use server";

import prisma from "@/lib/prisma";

export const getVentForDate = async (
  date: Date,
  userId: number | undefined,
) => {
  // validate that userId is present
  if (!userId) {
    throw new Error("userId is required");
  }
  // validate that date is today or in the past

  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  // get midnight of date
  const startOfDay = new Date(year, month, day);
  startOfDay.setHours(0);
  startOfDay.setMinutes(0);
  startOfDay.setSeconds(0);
  startOfDay.setMilliseconds(0);
  // get 11:59:59 of date
  const endOfDay = new Date(year, month, day);
  endOfDay.setHours(23);
  endOfDay.setMinutes(59);
  endOfDay.setSeconds(59);
  endOfDay.setMilliseconds(999);
  // get vent for date
  let ventForDate = await prisma.vent.findFirst({
    where: {
      createdAt: {
        lte: endOfDay,
        gte: startOfDay,
      },
    },
  });

  if (!ventForDate) {
    ventForDate = await createVent("", 1);
  }

  return ventForDate;
};

export const createVent = async (content: string, userId: number) => {
  const data = {
    userId,
    content,
  };
  const ventCreated = await prisma?.vent.create({
    data,
  });

  return ventCreated;
};
