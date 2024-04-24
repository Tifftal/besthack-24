const colors = {
    default: 'green',
    danger: 'red',
    warn: 'yellow',
}

export const getNotificationColor = (title?: string) => {
    if (!title) {
        return {
            color: '#c26b48',
            withCloseButton: true,
        };
    }

    const lowerCaseTitle = title.toLowerCase();

    if (lowerCaseTitle.startsWith('важно')) {
        return {
            color: colors.warn,
            withCloseButton: false,
        };
    }

    if (lowerCaseTitle.startsWith('срочно')) {
        return {
            color: colors.danger,
            withCloseButton: false,
        };
    }

    return {
        color: colors.default,
        withCloseButton: true,
    }
}
