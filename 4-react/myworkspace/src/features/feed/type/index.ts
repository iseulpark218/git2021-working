interface FeedState {
  id: number;
  content?: string | undefined;
  dataUrl?: string | undefined;
  fileType?: string;
  createdTime: number;
  modifyTime?: number;
  isEdit?: boolean;
  username?: string | undefined;
  image?: string | undefined;
}
export type { FeedState };