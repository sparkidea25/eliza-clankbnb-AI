export interface getListing {
    title: string,
    description: string,
    houseType: string,
    location: string,
    area: string,
    price: string,
    guest: string,
    bedroom: string,
    bathroom: string,
    images: string[],
    features: string[]
}

export interface addListing {
    title: string,
    slug: string,
    description: string,
    houseType: string,
    location: string,
    area: string,
    price: string,
    bedroom: string,
    guest: string,
    images: string[],
    bathroom: string,
    features: string[]
}