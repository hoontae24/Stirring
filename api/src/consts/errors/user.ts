import ContextError from 'lib/errors/ContextError';

const errorCases = {
  USER_REGISTER_DATA_EMPTY: new ContextError({
    id: 'USER_001',
    name: 'USER_REGISTER_DATA_EMPTY',
    message: '잘못된 사용자 정보입니다.',
    status: 400,
  }),
  USER_REGISTER_EMAIL_EMPTY: new ContextError({
    id: 'USER_002',
    name: 'USER_REGISTER_EMAIL_EMPTY',
    message: '이메일이 입력되지 않았습니다.',
    status: 400,
  }),
  USER_REGISTER_NAME_EMPTY: new ContextError({
    id: 'USER_003',
    name: 'USER_REGISTER_NAME_EMPTY',
    message: '사용자 이름이 입력되지 않았습니다.',
    status: 400,
  }),
  USER_REGISTER_PASSWORD_EMPTY: new ContextError({
    id: 'USER_004',
    name: 'USER_REGISTER_PASSWORD_EMPTY',
    message: '비밀번호가 입력되지 않았습니다.',
    status: 400,
  }),
  USER_REGISTER_EMAIL_DUPLICATED: new ContextError({
    id: 'USER_005',
    name: 'USER_REGISTER_EMAIL_DUPLICATED',
    message: '이미 등록된 이메일입니다.',
    status: 403,
  }),
};

export default errorCases;
