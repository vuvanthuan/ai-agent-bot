declare module 'react-i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: {
            translation: {
                welcome: string;
                description: string;
            };
        };
    }
}
