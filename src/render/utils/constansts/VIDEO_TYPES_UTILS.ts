export enum VIDEO_TYPES_UTILS {
  INTERNAL,
  APARAT,
  YOUTUBE
}
export enum VIDEO_TYPES_TITLE_UTILS {
  'آپلود',
  'آپارات',
  'یوتیوب'
}
export const VIDEO_TYPES_OPTIONS = [
  {
    title: VIDEO_TYPES_TITLE_UTILS[VIDEO_TYPES_UTILS.INTERNAL],
    value: VIDEO_TYPES_UTILS.INTERNAL
  },
  {
    title: VIDEO_TYPES_TITLE_UTILS[VIDEO_TYPES_UTILS.APARAT],
    value: VIDEO_TYPES_UTILS.APARAT
  },
  {
    title: VIDEO_TYPES_TITLE_UTILS[VIDEO_TYPES_UTILS.YOUTUBE],
    value: VIDEO_TYPES_UTILS.YOUTUBE
  },
]