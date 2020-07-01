import ContextError from '@/lib/errors/ContextError';

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
  AUTH_REGISTER_DATA_EMPTY: new ContextError({
    id: 'AUTH_003',
    name: 'AUTH_REGISTER_DATA_EMPTY',
    message: '잘못된 사용자 정보입니다.',
    status: 400,
  }),
  AUTH_REGISTER_EMAIL_EMPTY: new ContextError({
    id: 'AUTH_004',
    name: 'AUTH_REGISTER_EMAIL_EMPTY',
    message: '이메일이 입력되지 않았습니다.',
    status: 400,
  }),
  AUTH_REGISTER_NAME_EMPTY: new ContextError({
    id: 'AUTH_005',
    name: 'AUTH_REGISTER_NAME_EMPTY',
    message: '사용자 이름이 입력되지 않았습니다.',
    status: 400,
  }),
  AUTH_REGISTER_PASSWORD_EMPTY: new ContextError({
    id: 'AUTH_006',
    name: 'AUTH_REGISTER_PASSWORD_EMPTY',
    message: '비밀번호가 입력되지 않았습니다.',
    status: 400,
  }),
  AUTH_REGISTER_EMAIL_DUPLICATED: new ContextError({
    id: 'AUTH_007',
    name: 'AUTH_REGISTER_EMAIL_DUPLICATED',
    message: '이미 등록된 이메일입니다.',
    status: 403,
  }),
  AUTH_REQUIRED_LOGIN: new ContextError({
    id: 'AUTH_008',
    name: 'AUTH_REQUIRED_LOGIN',
    message: '로그인이 필요한 서비스입니다.',
    status: 403,
  }),
};

export default errorCases;
