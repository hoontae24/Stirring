import ContextError from 'lib/errors/ContextError';

const errorCases = {
  AUTH_LOGIN_EMAIL_UNREGISTERED: new ContextError({
    id: 'AUTH_001',
    name: 'AUTH_LOGIN_EMAIL_UNREGISTERED',
    message: '등록되지 않은 이메일입니다.',
    status: 404,
  }),
  AUTH_LOGIN_PASSWORD_UNMATCHED: new ContextError({
    id: 'AUTH_002',
    name: 'AUTH_LOGIN_PASSWORD_UNMATCHED',
    message: '비밀번호가 일치하지 않습니다.',
    status: 403,
  }),
};

export default errorCases;
