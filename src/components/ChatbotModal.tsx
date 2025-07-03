"use client"

import { useState } from "react"
import { Modal, Button } from "antd"
import { MessageOutlined } from "@ant-design/icons"
import ChatbotX from "./ChatbotX"

export default function ChatbotModal() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<MessageOutlined />}
                    onClick={showModal}
                    className="w-14 h-14 shadow-lg"
                />
            </div>

            <Modal
                title="🤖 Grok AI Assistant"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={500}
                height={600}
                styles={{
                    body: {
                        height: "500px",
                        padding: 0,
                        overflow: "hidden",
                    },
                }}
                destroyOnClose={true}
            >
                <ChatbotX />
            </Modal>
        </>
    )
}
