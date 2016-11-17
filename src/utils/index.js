export function deviceDetect () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i);
    var bIsIphoneOs = sUserAgent.match(/iphone os/i);
    var bIsMidp = sUserAgent.match(/midp/i);
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i);
    var bIsUc = sUserAgent.match(/ucweb/i);
    var bIsAndroid = sUserAgent.match(/android/i);
    var bIsCE = sUserAgent.match(/windows ce/i);
    var bIsWM = sUserAgent.match(/windows mobile/i);
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return 'mobile';
    } else {
        return 'client';
    }
}
export function isClient () {
    return deviceDetect() === 'client';
}
export function isMobile () {
    return deviceDetect() === 'mobile';
}

export function setItemIntoStorage (name, value) {
    const storage = window.localStorage;
    storage.setItem(name, JSON.stringify(value));
}

export function getItemFromStorage (name) {
    const storage = window.localStorage;
    const value = storage.getItem(name);
    return JSON.parse(value);
}

export function clearStorage () {
    const storage = window.localStorage;
    for (const key in storage) {
        storage.removeItem(key);
    }
}
export function removeItemFromStorage (name) {
    const storage = window.localStorage;
    storage.removeItem(name);
    return true;
}
