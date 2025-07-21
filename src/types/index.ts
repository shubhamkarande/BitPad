export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  theme: 'light' | 'dark';
}

export interface Bit {
  id: string;
  title: string;
  description: string;
  html: string;
  css: string;
  javascript: string;
  isPublic: boolean;
  authorId: string;
  authorUsername: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export interface BitContextType {
  bits: Bit[];
  createBit: (bit: Omit<Bit, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>) => string;
  updateBit: (id: string, updates: Partial<Bit>) => void;
  deleteBit: (id: string) => void;
  getBit: (id: string) => Bit | undefined;
  getPublicBits: () => Bit[];
  getUserBits: (userId: string) => Bit[];
  incrementViews: (id: string) => void;
}