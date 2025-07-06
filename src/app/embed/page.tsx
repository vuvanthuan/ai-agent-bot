import ChatbotHeader from "@/components/ChatbotHeader"
import ChatbotX from "@/components/ChatbotX"

export default function EmbedPage() {
    return (
        <div className="h-screen w-screen flex flex-col justify-end p-4 gap-4">
            <ChatbotHeader />
            <ChatbotX />
        </div>
    )
}
