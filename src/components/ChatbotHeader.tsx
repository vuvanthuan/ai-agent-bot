'use client'

import { Welcome } from "@ant-design/x";
import { useTranslation } from "react-i18next";

const ChatbotHeader = () => {
    const { t } = useTranslation();

    return (
        <Welcome
            icon="http://localhost:3000/public/logo.png"
            title={t('welcome')}
            description={t('description')}
            style={{
                padding: '16px',
            }}
        />
    );
}

export default ChatbotHeader;
