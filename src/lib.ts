import { formatToUTCPlus8 } from './utils';

const API_BASE = "https://w5.ab.ust.hk/njggt/api/app/prepaid";
const API_AC_STATUS = `${API_BASE}/ac-status`;
const API_AC_TIMER = `${API_BASE}/ac-timer`;
const API_TOGGLE_STATUS = `${API_BASE}/toggle-status`;

interface ResponseMeta {
    success: boolean;
    message: string;
}

function getBearerToken(): string {
    const item = localStorage.getItem("ggt_student");
    if (!item) {
        return "";
    } else {
        return JSON.parse(item).token || "";
    }
}

async function request(url: string, body?: any, method: string = "POST"): Promise<Response> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const token = getBearerToken();

        xhr.open(method, url, true);
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("authorization", `Bearer ${token}`);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.withCredentials = true;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const response = new Response(xhr.responseText, {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                resolve(response);
            }
        };

        xhr.onerror = function () {
            reject(new Error('Network error'));
        };

        xhr.ontimeout = function () {
            reject(new Error('Request timeout'));
        };

        xhr.timeout = 10000; // 10 second timeout

        if (method === "POST" && body) {
            xhr.send(JSON.stringify(body));
        } else {
            xhr.send();
        }
    });
}

async function isOn(): Promise<boolean> {
    try {
        const response = await request(API_AC_STATUS, undefined, "GET");
        const data = await response.json();
        const I = data?.data?.ac_status?.I;
        const P = data?.data?.ac_status?.P;
        return (I && I > 0) || (P && P > 0);
    } catch (error) {
        console.error('Error checking AC status:', error);
        return false;
    }
}

async function makeResponseMeta(response: Response, additionalMsg?: string): Promise<ResponseMeta> {
    try {
        const data = await response.json();
        let msg = "";
        msg += response.ok ? "Operation succeeded :)" : "Operation failed :(";
        if (!response.ok) {
            msg += `\nError: ${data?.meta?.message || "Unknown Error"} (${response.status})`;
        }
        if (additionalMsg) {
            msg += `\n${additionalMsg}`;
        }
        return { success: response.ok, message: msg };
    } catch (error) {
        return {
            success: false,
            message: `Operation failed :(\nError: Failed to parse response (${response.status})`
        };
    }
}

export async function powerOffAt(time: Date): Promise<ResponseMeta> {
    try {
        const formattedTime = formatToUTCPlus8(time);
        const acIsOn = await isOn();

        if (acIsOn) {
            const body = { ac_timer: { timer: time.toISOString() } };
            const response = await request(API_AC_TIMER, body, "POST");
            return await makeResponseMeta(response, response.ok ? `AC will be powered off at ${formattedTime}` : "");
        } else {
            const body = { toggle: { timer: time.toISOString(), status: 1 } };
            const response = await request(API_TOGGLE_STATUS, body, "POST");
            return await makeResponseMeta(response, response.ok ? `AC has been turned on. It will be powered off at ${formattedTime}` : "");
        }
    } catch (error) {
        console.error('Error in powerOffAt:', error);
        return {
            success: false,
            message: `Operation failed :(\nError: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}