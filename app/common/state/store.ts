import { create } from "zustand";
import { ThemeType } from "../models/themeType";
import { PoolingPostsFirebaseType } from "../models/service";

// export type Post = {
//   id: string;
//   title?: string;
//   content?: string;
//   createdAt: number;
//   authorId?: string;
// };

type AppState = {
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
  posts: PoolingPostsFirebaseType[];
  setPosts: (posts: PoolingPostsFirebaseType[]) => void;
  addPost: (post: PoolingPostsFirebaseType) => void;
  clearPosts: () => void;
};

export const useStore = create<AppState>((set) => ({
  theme: "system",
  setTheme: (theme) => set(() => ({ theme })),
  posts: [],
  setPosts: (posts) => set(() => ({ posts })),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  clearPosts: () => set(() => ({ posts: [] })),
}));

export default useStore;
