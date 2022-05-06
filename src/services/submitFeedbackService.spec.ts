import { SubmitFeedbackService } from './submitFeedbackService';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy }, 
    { sendMail: sendMailSpy }
)


describe('SubmitFeedback', ()=> {
    it('should be able to submit a feedback', async ()=> {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64, dkasdkosgfjasofgoas',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without type', async ()=> {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64, dkasdkosgfjasofgoas',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async ()=> {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64, dkasdkosgfjasofgoas',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with an invalid screenshot', async ()=> {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'test.jpg',
        })).rejects.toThrow();
    });
});