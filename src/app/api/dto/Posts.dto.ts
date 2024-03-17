export interface CommentDTO {
  ID: string;
  content: string;
  author: {
    name: string;
  };
}

export interface PostDTO {
  ID: number;
  site_ID: number;
  URL: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar_URL: string;
  };
  discussion: {
    comment_count: number;
  };
  excerpt: string;
  post_thumbnail: {
    ID: number;
    URL: string;
    width: number;
    height: number;
  };
  comments?: CommentDTO[];
}
