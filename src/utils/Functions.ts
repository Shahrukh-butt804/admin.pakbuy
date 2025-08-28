

export const ImageUrl = (image: string) => {
    let { PUBLIC_URL } = process.env;
    return `${PUBLIC_URL}/images/${image}`;
};
