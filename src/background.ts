function compareVersions(v1: string, v2: string): number {
    const v1Parts = v1.split('.').map(Number);
    const v2Parts = v2.split('.').map(Number);
    for (let i = 0; i < Math.min(v1Parts.length, v2Parts.length); i++) {
        if (v1Parts[i] > v2Parts[i]) return 1;
        if (v1Parts[i] < v2Parts[i]) return -1;
    }
    if (v1Parts.length > v2Parts.length) return 1;
    if (v1Parts.length < v2Parts.length) return -1;
    return 0;
}

function showPrivacyPage() {
    chrome.tabs.create({ url: "privacy.html" });
}

export function handleInstall(details: chrome.runtime.InstalledDetails) {
    console.log("Handling install/update:", details);
    if (details.reason === "install") {
        showPrivacyPage();
    } else if (details.reason === "update") {
        if (details.previousVersion) {
            if (compareVersions(details.previousVersion, "1.0.0") === -1) {
                showPrivacyPage();
            }
        }
    }
}

chrome.runtime.onInstalled.addListener(handleInstall);