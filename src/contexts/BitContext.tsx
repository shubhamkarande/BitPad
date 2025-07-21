import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Bit, BitContextType } from '../types';

const BitContext = createContext<BitContextType | undefined>(undefined);

export const useBits = () => {
  const context = useContext(BitContext);
  if (!context) {
    throw new Error('useBits must be used within a BitProvider');
  }
  return context;
};

interface BitProviderProps {
  children: ReactNode;
}

export const BitProvider: React.FC<BitProviderProps> = ({ children }) => {
  const [bits, setBits] = useState<Bit[]>([]);

  useEffect(() => {
    const storedBits = localStorage.getItem('bitpad_bits');
    if (storedBits) {
      setBits(JSON.parse(storedBits));
    } else {
      // Add some sample bits
      const sampleBits: Bit[] = [
        {
          id: uuidv4(),
          title: "Rainbow Button",
          description: "A colorful animated button with hover effects",
          html: '<button class="rainbow-btn">Click me!</button>',
          css: `.rainbow-btn {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.rainbow-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}`,
          javascript: 'document.querySelector(".rainbow-btn").addEventListener("click", () => alert("Hello from BitPad!"));',
          isPublic: true,
          authorId: 'sample-user',
          authorUsername: 'BitPadTeam',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 42,
          likes: 8
        }
      ];
      setBits(sampleBits);
      localStorage.setItem('bitpad_bits', JSON.stringify(sampleBits));
    }
  }, []);

  const createBit = (bitData: Omit<Bit, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>): string => {
    const newBit: Bit = {
      ...bitData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0
    };

    const updatedBits = [...bits, newBit];
    setBits(updatedBits);
    localStorage.setItem('bitpad_bits', JSON.stringify(updatedBits));
    return newBit.id;
  };

  const updateBit = (id: string, updates: Partial<Bit>) => {
    const updatedBits = bits.map(bit =>
      bit.id === id
        ? { ...bit, ...updates, updatedAt: new Date().toISOString() }
        : bit
    );
    setBits(updatedBits);
    localStorage.setItem('bitpad_bits', JSON.stringify(updatedBits));
  };

  const deleteBit = (id: string) => {
    const updatedBits = bits.filter(bit => bit.id !== id);
    setBits(updatedBits);
    localStorage.setItem('bitpad_bits', JSON.stringify(updatedBits));
  };

  const getBit = (id: string): Bit | undefined => {
    return bits.find(bit => bit.id === id);
  };

  const getPublicBits = (): Bit[] => {
    return bits.filter(bit => bit.isPublic).sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  };

  const getUserBits = (userId: string): Bit[] => {
    return bits.filter(bit => bit.authorId === userId).sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  };

  const incrementViews = (id: string) => {
    const updatedBits = bits.map(bit =>
      bit.id === id ? { ...bit, views: bit.views + 1 } : bit
    );
    setBits(updatedBits);
    localStorage.setItem('bitpad_bits', JSON.stringify(updatedBits));
  };

  const value: BitContextType = {
    bits,
    createBit,
    updateBit,
    deleteBit,
    getBit,
    getPublicBits,
    getUserBits,
    incrementViews
  };

  return <BitContext.Provider value={value}>{children}</BitContext.Provider>;
};