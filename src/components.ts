import { addMinutes, isValidNumber } from './utils';
import { powerOffAt } from './lib';

export function createSubmitButton(): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = "SET";
    button.id = "ac-addon-submit-btn";
    button.onclick = handleSubmitClick;
    return button;
}

export function disableSubmitButton(): void {
    const button = document.getElementById("ac-addon-submit-btn");
    if (button instanceof HTMLButtonElement) {
        button.disabled = true;
    }
}

async function handleSubmitClick() {
    disableSubmitButton();
    const input = document.getElementById("ac-addon-time-input");
    if (!(input instanceof HTMLInputElement)) {
        console.error("Time input element not found");
        return;
    }
    const value = input.value.trim();
    if (!isValidNumber(value)) {
        alert("Please enter a valid integer.");
        return;
    }
    const minutesToAdd = Number(value);
    const targetTime = addMinutes(new Date(), minutesToAdd);

    try {
        const meta = await powerOffAt(targetTime);
        alert(meta.message);
    } catch (error) {
        alert(`Unexpected error: ${error}`);
    }
    location.reload();
}
