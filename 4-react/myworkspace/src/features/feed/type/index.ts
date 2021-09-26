interface FeedState {
  id: number;
  content?: string | undefined;
  dataUrl?: string | undefined;
  fileType?: string | undefined;
  createTime: number;
  modifyTime?: number;
  isEdit?: boolean;
  username?: string | undefined;
  image?: string | undefined;
}
export type { FeedState };