export const ActionType = {
  POST_LIKE: 'ACTION_TYPE_POST_LIKE',
  POST_DOWNLOAD: 'ACTION_TYPE_POST_DOWNLOAD',
} as const;

export type ActionType = valueof<typeof ActionType>;

export const actionTypes = Object.values(ActionType);
