import { create } from 'zustand';
import { ChatMessage } from './openrouter';

interface ChatState {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
      error: null, // Clear any errors when adding new messages
    })),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error, isLoading: false }),
}));
