import lodash from 'lodash';
import {
  emailPatternRegex,
  passwordPatternRegex,
  namePatternRegex,
  nameMinLength,
  nameMaxLength,
} from '@/consts/account';

export const validateEmail = (email) => {
  if (!email) return '이메일이 입력되지 않았습니다.';
  if (!emailPatternRegex.test(email)) {
    return '잘못된 이메일 형식입니다.';
  }
};

export const validateName = (name) => {
  if (!name) return '이름이 입력되지 않았습니다.';
  if (name.length < nameMinLength || name.length > nameMaxLength) {
    return `이름은 ${nameMinLength} ~ ${nameMaxLength}자로 입력해야 합니다.`;
  }
  if (!namePatternRegex.test(name)) {
    return '이름은 영문, 한글, 숫자, 밑줄(_)만 입력해야 합니다.';
  }
};

export const validatePassword = (password) => {
  if (!password) return '비밀번호가 입력되지 않았습니다.';
  if (!passwordPatternRegex.test(password)) {
    return '비밀번호는 영문/숫자/특수문자(!@#$%^&+=)를 포함한 8~20자로 입력해야 합니다.';
  }
};

export const validateAccount = (account) => {
  const { name, email, password, confirmPassword } = account;
  const passwordMatched =
    !lodash.matches(password, confirmPassword) &&
    '비밀번호가 일치하지 않습니다.';
  const validations = {
    name: validateName(name),
    email: validateEmail(email),
    password: passwordMatched || validatePassword(password),
    confirmPassword:
      passwordMatched || validatePassword(confirmPassword),
  };
  if (lodash.values(validations).some(Boolean)) {
    return validations;
  }
};
