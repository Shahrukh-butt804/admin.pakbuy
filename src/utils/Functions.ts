
export const ImageUrl = (image: string) => {
    const { hostname } = window.location;

    var basename = "/"
    if (hostname.includes("react.customdev.solutions")) {
        basename = "/choosewell/admin/"
    }
    basename;

    return `${basename}images/${image}`;
};


