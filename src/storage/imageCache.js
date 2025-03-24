import { imageUpdatedAt } from "../utility/config";

export const getImageName = (imageUrl) => {
    // http://localhost:3000/images/sabai_2025/1.png
    const parts = imageUrl.split("/");
    if (parts === 0) {
        return "";
    }
    const lastItem = parts[parts.length - 1];
    return lastItem.replace(".", "_");
}
export const isLoadFromCache = () => {
    const lsUpdatedAt = localStorage.getItem("imageUpdatedAt");
    if (!lsUpdatedAt) {
        return false;
    }
    return imageUpdatedAt === lsUpdatedAt;
}

async function fetchImageAsBase64(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Error fetching image:", error);
        return null;
    }
}

export const getImage = async (imageUrl) => {
    const fileName = getImageName(imageUrl);

    if (isLoadFromCache()) {
        const cachedImage = localStorage.getItem(fileName);
        if (cachedImage) {
            return cachedImage;
        }
    }
    const imageData = await fetchImageAsBase64(imageUrl);
    if (imageData) {
        localStorage.setItem(fileName, imageData);
        localStorage.setItem("imageUpdatedAt", imageUpdatedAt);
        return imageData;
    }
    return imageUrl;
}