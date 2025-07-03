"use client"

import { useState } from "react"
import { Button, Card } from "antd"
import { MessageOutlined, CloseOutlined } from "@ant-design/icons"
import ChatbotX from "./ChatbotX"

export default function FloatingChatbot() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<MessageOutlined />}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 shadow-lg"
                />
            </div>

            {isOpen && (
                <Card
                    className="fixed bottom-24 right-6 w-96 h-[500px] z-40 shadow-2xl"
                    bodyStyle={{ padding: 0, height: "100%" }}
                    title={
                        <div className="flex justify-between items-center">
                            <span>AI Assistant</span>
                            <Button type="text" icon={<CloseOutlined />} onClick={() => setIsOpen(false)} />
                        </div>
                    }
                >
                    <ChatbotX />
                </Card>
            )}
        </>
    )
}
