"use client"

import { Layout, Typography, Card, Row, Col, Space } from "antd"
import { RobotOutlined, CodeOutlined, ThunderboltOutlined } from "@ant-design/icons"
import ChatbotModal from "@/components/ChatbotModal"
import ProjectShowcase from "@/components/ProjectShowcase"

const { Header, Content } = Layout
const { Title, Paragraph } = Typography

export default function Home() {
    return (
        <Layout className="min-h-screen">
            <Header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto flex items-center h-full">
                    <div className="flex items-center space-x-2">
                        <RobotOutlined className="text-2xl text-purple-600" />
                        <Title level={3} className="m-0 text-purple-600">
                            Grok AI Chatbot với Ant Design X
                        </Title>
                    </div>
                </div>
            </Header>

            <Content className="p-6">
                <div className="max-w-7xl mx-auto">
                    <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50">
                        <Row gutter={[24, 24]} align="middle">
                            <Col xs={24} lg={16}>
                                <Space direction="vertical" size="large">
                                    <Title level={2}>
                                        Grok AI + Ant Design X
                                        <br />
                                        <span className="text-purple-600">New AI Experience</span>
                                    </Title>
                                    <Paragraph className="text-lg text-gray-600">
                                        Trải nghiệm AI mới với Grok từ xAI và Ant Design X - sự kết hợp hoàn hảo giữa AI thông minh và giao
                                        diện người dùng hiện đại.
                                    </Paragraph>
                                    <Space size="large">
                                        <Card size="small" className="text-center">
                                            <RobotOutlined className="text-2xl text-purple-500 mb-2" />
                                            <div className="font-medium">Grok AI</div>
                                        </Card>
                                        <Card size="small" className="text-center">
                                            <CodeOutlined className="text-2xl text-green-500 mb-2" />
                                            <div className="font-medium">Iframe Integration</div>
                                        </Card>
                                        <Card size="small" className="text-center">
                                            <ThunderboltOutlined className="text-2xl text-orange-500 mb-2" />
                                            <div className="font-medium">Next.js 15</div>
                                        </Card>
                                    </Space>
                                </Space>
                            </Col>
                            <Col xs={24} lg={8}>
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🤖</div>
                                    <Paragraph type="secondary">Click vào nút chat ở góc phải để chat với Grok!</Paragraph>
                                </div>
                            </Col>
                        </Row>
                    </Card>

                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={16}>
                            <ProjectShowcase />
                        </Col>
                        <Col xs={24} lg={8}>
                            <Card title="Hướng dẫn tích hợp">
                                <Space direction="vertical" className="w-full">
                                    <div>
                                        <Title level={5}>Tích hợp Grok Chatbot</Title>
                                        <Paragraph>Để tích hợp chatbot Grok vào dự án của bạn:</Paragraph>
                                        <Card size="small" className="bg-gray-50">
                                            <code className="text-xs">
                                                {`<iframe
  src="/embed"
  width="400"
  height="500">
</iframe>`}
                                            </code>
                                        </Card>
                                    </div>

                                    <div>
                                        <Title level={5}>Tính năng Grok AI</Title>
                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                            <li>AI thông minh từ xAI</li>
                                            <li>Phong cách trả lời hài hước</li>
                                            <li>Hiểu biết sâu về công nghệ</li>
                                            <li>Giao diện Ant Design X</li>
                                            <li>Modal và iframe support</li>
                                        </ul>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>

            <ChatbotModal />
        </Layout>
    )
}
