export interface PostComment {
    id: number;
    postId: number;
    userId: number;
    body: string;
    user:{
      username: string;
    }
  }
