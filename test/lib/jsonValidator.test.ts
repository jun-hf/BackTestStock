import { jsonValidator } from '../../src/lib/jsonValidator';
import { JsonSchema } from '../../src/types/utilType';
import { expect, beforeAll, describe, it, vi, afterEach } from 'vitest';


describe('Lib::jsonValidator', () => {
    let jsonValidatorFunc;
    let consoleError;
    beforeAll(() => {
        const buySchema: JsonSchema = {
            type: 'object',
            properties: {
                timeSeries: { type: 'string' },
                symbol: { type: 'string' }
            },
            required: ['timeSeries']
        };
        jsonValidatorFunc = jsonValidator(buySchema);
        consoleError = vi.spyOn(globalThis.console, 'error');
    });
    afterEach(() => {
        vi.resetAllMocks();
    });
    it('should call next function if pass in valid schema', () => {
        const req = { body: {} };
        const res = {
            status: vi.fn(() => res),
            send: vi.fn(),
        };
        const next = vi.fn();
        req.body = { timeSeries: 'DAILY', symbol: 'string'};
        jsonValidatorFunc(req, res, next);
        expect(next).toHaveBeenCalledOnce();
        expect(res.send).toHaveBeenCalledTimes(0);
        expect(res.status).toHaveBeenCalledTimes(0);
    });
    it('should return 400 status and error message', () => {
        const req = { body: {} };
        const res = {
            status: vi.fn(() => res),
            send: vi.fn(),
        };
        const next = vi.fn();
        req.body = { wrong : 'error'};
        jsonValidatorFunc(req, res, next);
        expect(next).toHaveBeenCalledTimes(0);
        expect(res.send).toHaveBeenCalledWith("must have required property 'timeSeries'");
        expect(res.status).toHaveBeenCalledWith(400);
        expect(consoleError).toHaveBeenCalledWith("must have required property 'timeSeries'");
    });
});