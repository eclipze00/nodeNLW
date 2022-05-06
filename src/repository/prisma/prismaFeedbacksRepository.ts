import { FeedbacksRepository, FeedbackCreateData } from '../feedbackRepository';
import { prisma } from '../../prisma';

export class PrismaFeedbacksRepository implements FeedbacksRepository{
    async create({ type, comment, screenshot }: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            }
        })
    }
}