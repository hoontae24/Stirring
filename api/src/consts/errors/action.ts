import { StatusCodes } from 'http-status-codes';

import ContextError from '@/lib/errors/ContextError';

const errorCases = {
  ACTION_CREATE_INVALID_DATA: new ContextError({
    id: 'ACTION_001',
    name: 'ACTION_CREATE_INVALID_DATA',
    message: '올바르지 않은 활동 정보입니다.',
    status: StatusCodes.BAD_REQUEST,
  }),
};

export default errorCases;
