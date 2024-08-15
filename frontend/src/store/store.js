import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

export const useStore = create((set) => ({
  // can use this hook to create a global state
  // set is a function that takes an object and updates the state with the object in zustand
  hasSkipped: false,
  user: null,
  isSigningUp: false,
  checkingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  isUpdatingAvatar: false,
  isEdittingUser: false,

  signup: async (credentials) => {
    set({ isSigningUp: true }); // set isSigningUp to true when signing up
    try {
      const res = await axios.post("/api/auth/signup", credentials);
      // console.log(res.data)
      set({ user: res.data.user, isSigningUp: true }); // set our state after signing up. This will trigger a re-render and .data.user as the response has the user object AND a success object
      toast.success("Signup successful!"); // show a toast message
    } catch (error) {
      toast.error(error.response.data.message || "Error in Signing up"); // if there is an error, show the error message
      set({ isSigningUp: false, user: null }); // set isSigningUp back to false
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post("/api/auth/login", credentials);
      // console.log(res.data.user.avatar)
      set({ user: res.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
      res.data.user.avatar === null && toast.info("Please update your avatar");
      return res.data.user;
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message || "Error in logging in");
      set({ user: null, isLoggingIn: false });
      return null;
    }
  },
  updateAvatar: async (avatar) => {
    set({ isUpdatingAvatar: true });
    try {
      // console.log("avatar:" ,avatar)
      const res = await axios.post("/api/auth/updateAvatar", avatar);
      set({ user: res.data.user, isUpdatingAvatar: false });
      toast.success("Avatar updated successfully");
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message || "Error in updating avatar");
      set({ isUpdatingAvatar: false });
    }
  },
  updateUser: async (credentials) => {
    set({ isEdittingUser: true });
    try {
      const res = await axios.put("/api/auth/editUser", credentials);
      set({ user: res.data.user, isEdittingUser: false });
      toast.success("User updated successfully");
      return { success: true };
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message || "Error in updating user");
      set({ isEdittingUser: false });
      return { success: false, message: error.response.data.message };
    }
  },
  skipped: async () => {
    try {
      const res = await axios.post("/api/auth/skip");
      set({ user: res.data.user, hasSkipped: true });
      toast.info("Please update your avatar");
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message || "Error in skipping");
      set({ hasSkipped: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message || "Error in logging out");
      set({ isLoggingOut: false });
    }
  },
  getAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/api/auth/getAuth");
      set({ user: res.data.user, checkingAuth: false });
    } catch (error) {
      // console.log(error)
      set({ user: null, checkingAuth: false });
    }
  },
})); // now we can use the functions in the store in any component in our app
