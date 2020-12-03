module.exports.generalSanitize = (data) => {
    if (data.length > 4 && data.length < 20) {
        if (!(data.includes('<') || data.includes('>') ||
                data.includes(',') ||
                data.includes('/') || data.includes(`\\`) ||
                data.includes('"') || data.includes("'") ||
                data.includes('`') || data.includes('!') ||
                data.includes('*') || data.includes('#') ||
                data.includes('$') || data.includes('='))) {
            return data;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
module.exports.feedbackSanitize = (data) => {
    if (data.length > 4 && data.length < 200) {
        if (!(data.includes('<') || data.includes('>') ||

                data.includes('/') || data.includes(`\\`) ||
                data.includes('"') || data.includes("'") ||
                data.includes('`') || data.includes('!') ||
                data.includes('*') || data.includes('#') ||
                data.includes('$') || data.includes('='))) {
            return data;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
module.exports.descriptionSanitize = (data) => {
    if (data.length < 200) {
        if (!(data.includes('<') || data.includes('>') ||

                data.includes('"') || data.includes("'") ||
                data.includes('`') ||
                data.includes('*') || data.includes('#') ||
                data.includes('$') || data.includes('='))) {
            return data;
        } else {
            return false;
        }
    } else {
        return false;
    }
}