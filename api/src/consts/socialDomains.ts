export const socialDomains = {
  LOCAL: 'LOCAL',
  KAKAO: 'KAKAO',
  NAVER: 'NAVER',
  GOOGLE: 'GOOGLE',
} as const;

export type SocialDomainKey = valueof<typeof socialDomains>;
