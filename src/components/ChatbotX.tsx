'use client'

import React from 'react';
import { CloudUploadOutlined, LinkOutlined, UserOutlined } from '@ant-design/icons';
import { Attachments, AttachmentsProps, Bubble, Sender, useXAgent, useXChat } from '@ant-design/x';
import { Button, Flex, GetRef, type GetProp } from 'antd';
import { useTranslation } from "react-i18next";

import ChatBotLogo from './ChatBotLogo';

const roles: GetProp<typeof Bubble.List, 'roles'> = {
    ai: {
        placement: 'start',
        avatar: { icon: <ChatBotLogo />, style: { overflow: 'unset', background: 'transparent' } },
    },
    local: {
        placement: 'end',
        avatar: { icon: <UserOutlined />, style: { background: '#87d068' } },
    },
};

const ChatbotX = () => {
    const { t } = useTranslation();
    const [content, setContent] = React.useState('');
    const [openSenderHeader, setOpenSenderHeader] = React.useState(false);
    const [items, setItems] = React.useState<GetProp<AttachmentsProps, 'items'>>([]);

    const attachmentsRef = React.useRef<GetRef<typeof Attachments>>(null);
    const senderRef = React.useRef<GetRef<typeof Sender>>(null);

    const [agent] = useXAgent<string, { message: string }, string>({
        request: async ({ message }, { onSuccess, onUpdate }) => {
            const mockResponse = `Bạn vừa nói: "${message}". Tôi là Grok bản mockup, đây chỉ là phản hồi mẫu để bạn test UI. 😄`;
            let current = '';

            const interval = setInterval(() => {
                current = mockResponse.slice(0, current.length + 2);
                onUpdate(current);

                if (current === mockResponse) {
                    clearInterval(interval);
                    onSuccess([mockResponse]);
                }
            }, 50);
        },
    });

    const { onRequest, messages } = useXChat({
        agent, defaultMessages: [
            {
                id: 'init',
                message: t('message_default'),
                status: 'success',
            },
        ]
    });

    const senderHeader = (
        <Sender.Header
            title="Attachments"
            open={openSenderHeader}
            onOpenChange={setOpenSenderHeader}
            styles={{
                content: {
                    padding: 0,
                },
            }}
        >
            <Attachments
                ref={attachmentsRef}
                beforeUpload={() => false}
                items={items}
                onChange={({ fileList }) => setItems(fileList)}
                placeholder={(type) =>
                    type === 'drop'
                        ? {
                            title: 'Drop file here',
                        }
                        : {
                            icon: <CloudUploadOutlined />,
                            title: 'Upload files',
                            description: 'Click or drag files to this area to upload',
                        }
                }
                getDropContainer={() => senderRef.current?.nativeElement}
            />
        </Sender.Header>
    );

    return (
        <Flex vertical gap="middle">
            <Bubble.List
                roles={roles}
                style={{ maxHeight: 300, overflow: 'auto' }}
                items={messages.map(({ id, message, status }) => ({
                    key: id,
                    role: status === 'local' ? 'local' : 'ai',
                    content: message,
                }))}
            />
            <Sender
                allowSpeech
                ref={senderRef}
                header={senderHeader}
                loading={agent.isRequesting()}
                value={content}
                onChange={setContent}
                onSubmit={(nextContent) => {
                    setItems([]);
                    onRequest(nextContent);
                    setContent('');
                }}
                onPasteFile={(_, files) => {
                    for (const file of files) {
                        attachmentsRef.current?.upload(file);
                    }
                    setOpenSenderHeader(true);
                }}
                prefix={
                    <Button
                        type="text"
                        icon={<LinkOutlined />}
                        onClick={() => {
                            setOpenSenderHeader(!openSenderHeader);
                        }}
                    />
                }
            />
        </Flex>
    );
};

export default ChatbotX;
