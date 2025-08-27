import {
  getPowerOffDiv,
  getSelectTimeInput,
  waitForElement,
  configureTimeInput,
  updateElementText
} from './dom';
import { createSubmitButton } from './components';

async function addPanel(): Promise<void> {
  try {
    const powerOffDiv = await waitForElement(getPowerOffDiv);
    const clonedDiv = powerOffDiv.cloneNode(true) as HTMLDivElement;
    powerOffDiv.before(clonedDiv);
    const selectTimeInput = getSelectTimeInput();
    if (!selectTimeInput?.parentElement) {
      throw new Error("Select time input or its parent not found");
    }
    configureTimeInput(selectTimeInput);
  } catch (error) {
    console.error("Failed to add panel:", error);
  }
}

async function updateText(): Promise<void> {
  try {
    await updateElementText("Power-off after", "Power-off at");
  } catch (error) {
    console.error("Failed to update text:", error);
  }
}

async function addSubmitButton(): Promise<void> {
  try {
    const clockIcon = await waitForElement(() =>
      document.querySelector(".ant-picker-suffix")
    );
    const submitButton = createSubmitButton();
    clockIcon.after(submitButton);
    clockIcon.remove();
  } catch (error) {
    console.error("Failed to add submit button:", error);
  }
}

export async function removePickerClear(): Promise<void> {
  const element = await waitForElement(() => {
    return document.querySelector(".ant-picker-clear");
  });
  element.remove();
}

async function main(): Promise<void> {
  try {
    console.log('Initializing HKUST AC Addon...');

    await addPanel();
    await updateText();
    await addSubmitButton();
    await removePickerClear();

    console.log('HKUST AC Addon initialized successfully');
  } catch (error) {
    console.error('Failed to initialize HKUST AC Addon:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}