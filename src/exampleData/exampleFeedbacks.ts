import {Feedback, TMyFeedbackCard} from "@/types/Feedbacks";

export const exampleFeedbacks: Feedback[] = [{
    id: 1,
    user:{
        id: 3,
        username: "user2",
        email: "user@gmail.com",
        phone: "+77777777777",
        apWallet: false,
        avatarUrl: "/user.png",
        male: "Male"
    },
    rating: 5,
    date: '23-05-2024',
    text: 'Lorem ipsum dolor sit amet consectetur. Mattis mattis augue a in egestas pharetra. Vitae nulla nulla lectus nulla pellentesque augue. Quis suspendisse aenean ac tempus velit vulputate sed. Massa sed pellentesque ornare lacus tempus.',
    images: [],
    likes: 94,
    likedByMe: false,
    replies: [],
    updatedAt: '23-05-2024',
}]

export const exampleMyFeedbackCards: TMyFeedbackCard[] = [
    {
        id: 1,
        shopName: "Shop_name",
        productName: "Product",
        productImage: '/items/carpet.png',
        likedByMe: true,
        rating: 4.2,
        text: 'Lorem ipsum dolor sit amet consectetur. Mattis mattis augue a in egestas pharetra. Vitae nulla nulla lectus nulla pellentesque augue. Quis suspendisse aenean ac tempus velit vulputate sed. Massa sed pellentesque ornare lacus tempus.',
        likes: 94,
        images: [
            '/items/carpet.png',
            '/items/case.png',
            '/items/steeringWheel.png',
            '/items/evaCarpet.png',
            '/items/seatCovers.png',
        ]
    },
    {
        id: 2,
        shopName: "Shop_name",
        productName: "Product 2",
        productImage: '/items/seatCovers.png',
        likedByMe: false,
        rating: 3.7,
        text: 'Lorem ipsum dolor sit amet consectetur. Mattis mattis augue a in egestas pharetra. Vitae nulla nulla lectus nulla pellentesque augue. Quis suspendisse aenean ac tempus velit vulputate sed. Massa sed pellentesque ornare lacus tempus.',
        likes: 94,
        images: [
            '/items/seatCovers.png',
            '/items/wheelItems.png',
        ]
    },
    {
        id: 3,
        shopName: "Shop_name",
        productName: "Product 3",
        productImage: '/items/wheelItems.png',
        likedByMe: false,
        rating: 3,
        text: 'Lorem ipsum dolor sit amet consectetur. Mattis mattis augue a in egestas pharetra. Vitae nulla nulla lectus nulla pellentesque augue. Quis suspendisse aenean ac tempus velit vulputate sed. Massa sed pellentesque ornare lacus tempus.',
        likes: 94,
        images: [
            '/items/carpet.png',
            '/items/case.png',
        ]
    },
]