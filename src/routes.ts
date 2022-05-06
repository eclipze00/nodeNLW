import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repository/prisma/prismaFeedbacksRepository';
import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';
import { SubmitFeedbackService } from './services/submitFeedbackService';


export const routes = express.Router()



routes.post('/feedbacks', async (req, res)=> {

    const { type, comment, screenshot } = req.body;

    const prismaFeedbackRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbackRepository,
        nodemailerMailAdapter
    )

    await submitFeedbackService.execute({
        type,
        comment,
        screenshot,
    })



    return res.status(201).send();
});