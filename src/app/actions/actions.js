export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'
export const SELECT_REDDIT = 'SELECT_REDDIT'

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}