import { create } from "zustand";

const getInitialContent = () => {
    const savedContent = localStorage.getItem('homeContent');
    return savedContent ? JSON.parse(savedContent) : "movie";  // by default, the content will be set to movie
};

export const useHomeContent = create((set) => ({
    content: getInitialContent(),
    setContent: (type) => {
        localStorage.setItem('homeContent', JSON.stringify(type));
        set({ content: type });
    },
}));
// This is the store for the website media content. It will be used to store the  type of content (movie or tv show) that the user is currently viewing. This is used to set the type of content displayed when the user clicks on the Movies or TV Shows links in the Navbar component.