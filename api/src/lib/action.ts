import { ActionType, actionTypes } from '@/consts/action';

export const isActionType = (
  actionType: any,
): actionType is ActionType => {
  return Boolean(actionType && actionTypes.includes(actionType));
};
