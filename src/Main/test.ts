/**
 * 角色类型
 */
 export enum ExchangeType {
  /**
   * 全部
   */
  All = -1,
  /**
   * 其他
   */
  OTHER = 0,
  /**
   * 骑手
   */
  RIDER = 1,
  /**
   * 客服
   */
  SERVICE = 2,
  /**
   * 店员
   */
  CLERK = 3,
  /**
   * 总部
   */
  HERDQUARTERS = 4,
}

export const ExchangeTypeMap: Record<ExchangeType, string> = {
  [ExchangeType.All]: '全部',
  [ExchangeType.OTHER]: '其他',
  [ExchangeType.RIDER]: '骑手',
  [ExchangeType.SERVICE]: '客服',
  [ExchangeType.CLERK]: '店员',
  [ExchangeType.HERDQUARTERS]: '总部',
};

//  git diff

console.log('arr', ExchangeTypeMap['1'])

export interface Info {
  names: string
}