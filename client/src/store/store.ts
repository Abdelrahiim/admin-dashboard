import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./features/global/globalSlice";
import { api } from "./services/api";
export const store = configureStore({
  reducer: {
    global: GlobalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the userStore itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
