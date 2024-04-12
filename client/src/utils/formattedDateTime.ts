export const getFormattedDate = (timestamp: string) => {
    const date: Date = new Date(timestamp)
    const formattedDate: string = date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    } as Intl.DateTimeFormatOptions)
    return formattedDate
}

export const getFormattedTime = (timestamp: string) => {
    const date: Date = new Date(timestamp)
    const formattedDate: string = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    } as Intl.DateTimeFormatOptions)
    return formattedDate
}
