import { FeedbacksRepository } from '../repository/feedbackRepository';
import { MailAdapter } from '../adapters/mailAdapter';

interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) {}

    async execute(request: SubmitFeedbackServiceRequest) {

        const { type, comment, screenshot } = request;

        //Regra de negócio para teste
        if(!type){
            throw new Error('Type is required.');
        }

        //Regra de negócio para teste
        if(!comment){
            throw new Error('Comment is required.');
        }


        //Regra de negócio para teste
        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111; ">`,
                `<p>Tipo do Feedback: ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : ``,
                `</div>`
            ].join('\n')
        })
    }
}