"use client"

import { useState } from "react"
import { Card, Select, Button, Space, Typography, Alert } from "antd"
import { FullscreenOutlined, ReloadOutlined, CodeOutlined } from "@ant-design/icons"

const { Title } = Typography
const { Option } = Select

interface Project {
    id: string
    name: string
    url: string
    description: string
}

const projects: Project[] = [
    {
        id: "1",
        name: "Portfolio Website",
        url: "https://example.com",
        description: "Website portfolio cá nhân",
    },
    {
        id: "2",
        name: "E-commerce Demo",
        url: "https://demo-store.vercel.app",
        description: "Ứng dụng thương mại điện tử demo",
    },
    {
        id: "3",
        name: "Dashboard",
        url: "https://dashboard-demo.vercel.app",
        description: "Dashboard phân tích dữ liệu",
    },
]

export default function ProjectShowcase() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [iframeKey, setIframeKey] = useState(0)

    const handleProjectChange = (projectId: string) => {
        const project = projects.find((p) => p.id === projectId)
        setSelectedProject(project || null)
        setIframeKey((prev) => prev + 1)
    }

    const handleReload = () => {
        setIframeKey((prev) => prev + 1)
    }

    const handleFullscreen = () => {
        if (selectedProject) {
            window.open(selectedProject.url, "_blank")
        }
    }

    return (
        <Card>
            <div className="mb-4">
                <Space direction="vertical" className="w-full">
                    <div className="flex justify-between items-center">
                        <Title level={4}>
                            <CodeOutlined className="mr-2" />
                            Dự án của tôi
                        </Title>
                        <Space>
                            <Select
                                placeholder="Chọn dự án"
                                style={{ width: 200 }}
                                onChange={handleProjectChange}
                                value={selectedProject?.id}
                            >
                                {projects.map((project) => (
                                    <Option key={project.id} value={project.id}>
                                        {project.name}
                                    </Option>
                                ))}
                            </Select>
                            {selectedProject && (
                                <>
                                    <Button icon={<ReloadOutlined />} onClick={handleReload} />
                                    <Button icon={<FullscreenOutlined />} onClick={handleFullscreen} />
                                </>
                            )}
                        </Space>
                    </div>

                    {selectedProject && <Alert message={selectedProject.description} type="info" showIcon className="mb-2" />}
                </Space>
            </div>

            <div className="relative h-96 border rounded-lg overflow-hidden bg-gray-50">
                {selectedProject ? (
                    <iframe
                        key={iframeKey}
                        src={selectedProject.url}
                        className="w-full h-full border-0"
                        title={selectedProject.name}
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <CodeOutlined className="text-4xl text-gray-400 mb-4" />
                            <Title level={5} type="secondary">
                                Chọn một dự án để xem preview
                            </Title>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}
