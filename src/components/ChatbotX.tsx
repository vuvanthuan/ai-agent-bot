'use client'

import React from 'react';
import { CloudUploadOutlined, LinkOutlined, CopyOutlined, UserOutlined, SyncOutlined } from '@ant-design/icons';
import { Attachments, AttachmentsProps, Bubble, Sender, useXAgent, useXChat } from '@ant-design/x';
import { Button, Flex, GetRef, Space, theme, type GetProp } from 'antd';
import useApp from 'antd/es/app/useApp';
import { useTranslation } from "react-i18next";

import ChatBotLogo from './ChatBotLogo';

const roles: GetProp<typeof Bubble.List, 'roles'> = {
    ai: {
        placement: 'start',
        avatar: { icon: <ChatBotLogo />, style: { overflow: 'unset', background: 'transparent' } },
    },
    local: {
        placement: 'end',
        avatar: { icon: <UserOutlined />, style: { background: '#456882' } },
    },
};

const ChatbotX = () => {
    const { t } = useTranslation();
    const { token } = theme.useToken();
    const { message } = useApp()

    const [content, setContent] = React.useState('');
    const [openSenderHeader, setOpenSenderHeader] = React.useState(false);
    const [items, setItems] = React.useState<GetProp<AttachmentsProps, 'items'>>([]);

    const attachmentsRef = React.useRef<GetRef<typeof Attachments>>(null);
    const senderRef = React.useRef<GetRef<typeof Sender>>(null);

    const [agent] = useXAgent<string, { message: string }, string>({
        request: async ({ message }, { onSuccess, onUpdate, onError }) => {
            try {
                const mockResponse = t('chatbot_response', { message });
                let current = '';

                const interval = setInterval(() => {
                    current = mockResponse.slice(0, current.length + 2);
                    onUpdate(current);

                    if (current === mockResponse) {
                        clearInterval(interval);
                        onSuccess([mockResponse]);
                    }
                }, 50);
            } catch (error: unknown) {
                onError(error as Error);
            }
        },
    });

    const { onRequest, messages } = useXChat({
        agent,
        defaultMessages: [
            {
                id: 'init',
                message: t('message_default'),
                status: 'success',
            },
        ]
    });

    const senderHeader = (
        <Sender.Header
            title={t('attachments_title')}
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
                            title: t('drop_file_placeholder'),
                        }
                        : {
                            icon: <CloudUploadOutlined />,
                            title: t('upload_files_title'),
                            description: t('upload_files_description'),
                        }
                }
                getDropContainer={() => senderRef.current?.nativeElement}
            />
        </Sender.Header>
    );

    const onCopy = async (textToCopy: string) => {
        if (!textToCopy) return message.error(t('text_empty'));

        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
            message.success(t('text_copied_success', { text: textToCopy }));
        } catch {
            message.error(t('copy_failed'));
        }
    };

    return (
        <Flex vertical gap="middle">
            <Bubble.List
                roles={roles}
                style={{ maxHeight: 300, overflow: 'auto' }}
                items={messages.map(({ id, message, status }) => ({
                    key: id,
                    role: status === 'local' ? 'local' : 'ai',
                    content: message,
                    footer: status !== 'local' && (
                        <Space size={token.paddingXXS}>
                            <Button color="default" variant="text" size="small" icon={<SyncOutlined />} />
                            <Button
                                color="default"
                                variant="text"
                                size="small"
                                onClick={() => onCopy(message)}
                                icon={<CopyOutlined />}
                            />
                        </Space>
                    )
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
