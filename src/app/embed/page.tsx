"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "antd"
import dynamic from "next/dynamic"

const ChatbotHeader = dynamic(() => import("@/components/ChatbotHeader"), {
    loading: () => <HeaderSkeleton />,
    ssr: false,
})

const ChatbotX = dynamic(() => import("@/components/ChatbotX"), {
    loading: () => <ChatbotSkeleton />,
    ssr: false,
})

function HeaderSkeleton() {
    return (
        <div className="w-full p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Skeleton.Avatar size="default" active />
                    <div className="flex flex-col gap-1">
                        <Skeleton.Input style={{ width: 120, height: 16 }} active />
                        <Skeleton.Input style={{ width: 80, height: 12 }} active />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton.Button size="small" active />
                    <Skeleton.Button size="small" active />
                </div>
            </div>
        </div>
    )
}

function ChatbotSkeleton() {
    return (
        <div className="flex-1 w-full bg-white rounded-lg border border-gray-200 p-4">
            <div className="space-y-4 mb-4">
                <div className="flex items-start gap-3">
                    <Skeleton.Avatar size="small" active />
                    <div className="flex-1">
                        <Skeleton.Input style={{ width: "60%", height: 16 }} active />
                        <div className="mt-2">
                            <Skeleton paragraph={{ rows: 2, width: ["80%", "60%"] }} active />
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-3 justify-end">
                    <div className="flex-1 text-right">
                        <Skeleton.Input style={{ width: "40%", height: 16, marginLeft: "auto" }} active />
                        <div className="mt-2 flex justify-end">
                            <Skeleton paragraph={{ rows: 1, width: "50%" }} active />
                        </div>
                    </div>
                    <Skeleton.Avatar size="small" active />
                </div>

                <div className="flex items-start gap-3">
                    <Skeleton.Avatar size="small" active />
                    <div className="flex-1">
                        <Skeleton.Input style={{ width: "70%", height: 16 }} active />
                        <div className="mt-2">
                            <Skeleton paragraph={{ rows: 3, width: ["90%", "75%", "45%"] }} active />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <Skeleton.Input style={{ width: "100%", height: 40 }} active />
                    </div>
                    <Skeleton.Button size="large" active />
                    <Skeleton.Button size="large" active />
                </div>
            </div>
        </div>
    )
}

function MainSkeleton() {
    return (
        <div className="h-screen w-screen flex flex-col justify-start p-4 gap-4">
            <HeaderSkeleton />
            <ChatbotSkeleton />
        </div>
    )
}

export default function EmbedPage() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return <MainSkeleton />
    }

    return (
        <div className="h-screen w-screen flex flex-col justify-start p-4 gap-4">
            <ChatbotHeader />
            <ChatbotX />
        </div>
    )
}
