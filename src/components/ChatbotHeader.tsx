'use client'

import { Welcome } from "@ant-design/x";
import { useTranslation } from "react-i18next";

const ChatbotHeader = () => {
    const { t } = useTranslation();

    return (
        <Welcome
            icon="https://metaverse-solution.vn/_next/image?url=%2Flogo.png&w=640&q=75"
            title={t('welcome')}
            description={t('description')}
            style={{
                padding: '16px',
                boxShadow: '0 4px 10px 0 rgba(59, 130, 246, 0.3)'
            }}
        />
    );
}

export default ChatbotHeader;
