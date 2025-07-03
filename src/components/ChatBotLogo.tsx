'use client';

import Image from 'next/image';

export default function ChatBotLogo() {
  return (
    <Image
      src="/chatbot.png"
      alt="ChatBot Logo"
      width={32}
      height={32}
      priority
    />
  );
}
