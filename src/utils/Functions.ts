
export const ImageUrl = (image: string) => {
    const { hostname } = window.location;

    var basename = "/"
    if (hostname.includes("react.customdev.solutions")) {
        basename = "./"
    }
    basename;

    return `${basename}images/${image}`;
};


