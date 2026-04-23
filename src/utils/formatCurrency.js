function getDefaultLocale(currencyCode) {
        const currencyLocaleMap = {
            USD: 'en-US',
            IDR: 'id-ID',
            EUR: 'de-DE',
            JPY: 'ja-JP',
            GBP: 'en-GB',
            CNY: 'zh-CN',
            AUD: 'en-AU'
        };

        return currencyLocaleMap[currencyCode] || 'en-US'; // fallback ke en-US
    }

export function formatCurrency(amount, currencyCode, locale = getDefaultLocale(currencyCode)) {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            maximumFractionDigits: 2
        }).format(amount);
    }