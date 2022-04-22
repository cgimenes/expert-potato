import { ProgressType } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import moment from 'moment';

export default async function UpdateProgress (req: NextApiRequest, res: NextApiResponse) {
  const { id, done } = req.body;

  const progress = await prisma.habitProgress.findFirst({
    where: {
      habitId: id,
      createdAt: {
        gte: moment().utc().startOf('day').toISOString(),
        lte: moment().utc().endOf('day').toISOString()
      },
      type: ProgressType.DONE
    }
  })

  if (progress && !done) {
    await prisma.habitProgress.delete({
      where: {
        id: progress.id
      }
    })
  } else if (!progress && done) {
    await prisma.habitProgress.create({
      data: {
        habitId: id,
        type: ProgressType.DONE
      }
    })
  }

  return res.status(204).send('');
}