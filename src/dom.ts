import { getParent, sleep } from './utils';

export function getSelectTimeInput(): HTMLInputElement | null {
    const element = document.querySelector('input[placeholder="Select time"]');
    return element instanceof HTMLInputElement ? element : null;
}

export function getPowerOffDiv(): HTMLDivElement | null {
    const powerOffTimeInput = getSelectTimeInput();
    if (!powerOffTimeInput) {
        return null;
    }
    const parentElement = getParent(powerOffTimeInput, 4);
    return parentElement instanceof HTMLDivElement ? parentElement : null;
}

export async function waitForElement<T>(
    selector: () => T | null,
    maxAttempts: number = 100,
    interval: number = 100
): Promise<T> {
    let attempts = 0;
    let element = selector();
    while (!element && attempts < maxAttempts) {
        await sleep(interval);
        element = selector();
        attempts++;
    }
    if (!element) {
        throw new Error(`Element not found after ${maxAttempts} attempts`);
    }
    return element;
}

export function configureTimeInput(input: HTMLInputElement): void {
    input.readOnly = false;
    input.type = "number";
    input.placeholder = "0";
    input.id = "ac-addon-time-input";
    const minsText = document.createTextNode("mins");
    input.after(minsText);
}

export async function updateElementText(targetText: string, newText: string): Promise<void> {
    const elements = await waitForElement(() => {
        const allElements = document.querySelectorAll("small");
        return allElements.length > 0 ? allElements : null;
    });
    let isFirstOccurrence = true;
    elements.forEach((element) => {
        if (element.textContent?.includes(targetText)) {
            if (isFirstOccurrence) {
                isFirstOccurrence = false;
                return; // Skip the first occurrence (added panel)
            }
            element.textContent = newText;
        }
    });
}
