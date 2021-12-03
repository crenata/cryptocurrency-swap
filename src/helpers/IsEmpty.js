const IsEmpty = (data) => {
    if (typeof data === "object") {
        if (!data) {
            return true;
        }
        return false;
    } else if (Array.isArray(data)) {
        if (data.length === 0) {
            return true;
        }
        return false;
    } else if (typeof data === "string") {
        if (!data.trim()) {
            return true;
        } else if (data === "undefined") {
            return true;
        } else if (data === "null") {
            return true;
        }
        return false;
    } else if (typeof data === "number") {
        if (data === 0) {
            return true;
        }
        return false;
    } else if (typeof data === "undefined") {
        return true;
    }
    return false;
};

export default IsEmpty;