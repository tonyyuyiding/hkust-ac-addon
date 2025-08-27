export async function sleep(time: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export function getParent(element: Element, levels: number = 1): Element | null {
    let currentElement: Element | null = element;
    for (let i = 0; i < levels; i++) {
        if (!currentElement?.parentElement) {
            return null;
        }
        currentElement = currentElement.parentElement;
    }
    return currentElement;
}

export function addMinutes(date: Date, minutes: number): Date {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    return newDate;
}

export function isValidNumber(value: string): boolean {
    if (!value.trim()) return false;
    const numericValue = Number(value);
    return !isNaN(numericValue) && numericValue > 0;
}

export function formatToUTCPlus8(date: Date): string {
    return date.toLocaleString('en-US', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}