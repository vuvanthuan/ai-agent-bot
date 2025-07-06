'use client';

import { I18nextProvider } from 'react-i18next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App, ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import type { Locale } from 'antd/es/locale';
import viVN from 'antd/es/locale/vi_VN';
import enUS from 'antd/es/locale/en_US';
import i18n from '@/lib/i18n';


const localeMap: { [key: string]: Locale } = {
    en: enUS,
    vi: viVN,
};

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <I18nextProvider i18n={i18n}>
            <AntdRegistry>
                <App>
                    <ConfigProvider
                        locale={localeMap[i18n.language] || enUS}
                        theme={{
                            token: {
                                colorPrimary: '#1677ff',
                                borderRadius: 8,
                            },
                        }}
                    >
                        {children}
                    </ConfigProvider>
                </App>
            </AntdRegistry>
        </I18nextProvider>
    );
}
