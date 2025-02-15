import {ItemCard, ItemInfoType} from "@/types/Item";
import {RefundItem} from "@/types/Refund";

export const itemInfo: ItemInfoType[] = [
    {
        id: 1,
        name: "Качественный перешив руля, ручки КПП",

        price: 2000,
        apPrice: 1800,
        currentPrice: 1500,
        discount: 25,
        favorite: true,

        marketName: "Market_name",
        rating: 3.6,
        ratingDistribution: {
            1: 2,
            2: 4,
            3: 9,
            4: 13,
            5: 86,
        },

        comments: {
            amount: 34,
            images: {
                totalImages: 75,
                image: [
                    {
                        user:{
                            id: 3,
                            username: "user2",
                            email: "user@gmail.com",
                            phone: "+77777777777",
                            apWallet: false,
                            avatarUrl: "user.png"
                        },
                        imageUrl:'/items/carpet.png',
                    },
                    {
                        user:{
                            id: 3,
                            username: "user2",
                            email: "user@gmail.com",
                            phone: "+77777777777",
                            apWallet: false,
                            avatarUrl: "user.png"
                        },
                        imageUrl:'/items/evaCarpet.png',
                    },
                    {
                        user:{
                            id: 3,
                            username: "user2",
                            email: "user@gmail.com",
                            phone: "+77777777777",
                            apWallet: false,
                            avatarUrl: "user.png"
                        },
                        imageUrl:'/items/case.png',
                    },
                ]
            },
            list: [{
                id: 1,
                user:{
                    id: 3,
                    username: "user2",
                    email: "user@gmail.com",
                    phone: "+77777777777",
                    apWallet: false,
                    avatarUrl: "/user.png"
                },
                rating: 5,
                date: '23-05-2024',
                text: 'Lorem ipsum dolor sit amet consectetur. Mattis mattis augue a in egestas pharetra. Vitae nulla nulla lectus nulla pellentesque augue. Quis suspendisse aenean ac tempus velit vulputate sed. Massa sed pellentesque ornare lacus tempus.',
                images: [],
                likes: 94,
                replies: [],
                updatedAt: '23-05-2024',
            }],
        },


        sold: 150,
        options: ["Черный", "Красный", "Синий"],
        type: ["Перешив", "Тюнинг"],
        brand: "AutoStyle",
        material: "Кожа",
        article: 15978954613,
        images: [
            "/items/steeringWheel.png",
            "/items/case.png",
            "/items/evaCarpet.png",
            "/items/seatCovers.png",
            "/items/wheelItems.png",
            "/items/carpet.png",
        ],
        description: 'Lorem ipsum dolor sit amet consectetur. ' +
            'Enim lectus et lorem auctor fermentum tellus purus enim. ' +
            'Amet luctus sit mauris non euismod sagittis sit amet suscipit. ' +
            'Quisque morbi scelerisque neque vulputate pharetra est. ' +
            'Sed eleifend elit parturient eleifend scelerisque. ' +
            'Etiam viverra vel amet tincidunt felis. ' +
            'Vel pellentesque aliquam faucibus nisl dignissim nisl justo lacus diam. ' +
            'Quam nisl porttitor eget elit ornare pellentesque eget sapien. ' +
            'Eu imperdiet malesuada semper in in purus urna velit. ' +
            'Diam dolor lacinia nunc duis a. Sit sit libero blandit ante tristique velit. ' +
            'Vestibulum cursus morbi sed egestas sed viverra sagittis cras.',
    },
    {
        id: 2,
        name: "Коврики эва ева с бортами, EVA с бортиками 3D",

        price: 3200,
        apPrice: 1800,
        currentPrice: null,
        discount: null,
        favorite: false,

        marketName: "Market_name",
        rating: 4.5,
        ratingDistribution: {
            1: 2,
            2: 4,
            3: 9,
            4: 13,
            5: 86,
        },

        comments: {
            amount: 34,
            images: {
                totalImages: 75,
                image: [
                    {
                        user:{
                            id: 3,
                            username: "user2",
                            email: "user@gmail.com",
                            phone: "+77777777777",
                            apWallet: false,
                            avatarUrl: "user.png"
                        },
                        imageUrl:'/items/carpet.png',
                    },
                ]
            },
            list: [{
                id: 1,
                user:{
                    id: 3,
                    username: "user2",
                    email: "user@gmail.com",
                    phone: "+77777777777",
                    apWallet: false,
                    avatarUrl: "/user.png"
                },
                rating: 4,
                date: '23-05-2024',
                text: 'Lorem ipsum dolor sit amet consectetur. Mattis mattis augue a in egestas pharetra. Vitae nulla nulla lectus nulla pellentesque augue. Quis suspendisse aenean ac tempus velit vulputate sed. Massa sed pellentesque ornare lacus tempus.',
                images: [],
                likes: 94,
                replies: [],
                updatedAt: '23-05-2024',
            }],
        },
        sold: 90,
        article: 15978954613,
        options: ["Черный", "Серый", "Бежевый"],
        type: ["Коврики", "Защита интерьера"],
        brand: "EvaLux",
        material: "Полиуретан",
        images: ["/items/evaCarpet.png"],
        description: 'Lorem ipsum dolor sit amet consectetur. ' +
            'Enim lectus et lorem auctor fermentum tellus purus enim. ' +
            'Amet luctus sit mauris non euismod sagittis sit amet suscipit. ' +
            'Quisque morbi scelerisque neque vulputate pharetra est. ' +
            'Sed eleifend elit parturient eleifend scelerisque. ' +
            'Etiam viverra vel amet tincidunt felis. ' +
            'Vel pellentesque aliquam faucibus nisl dignissim nisl justo lacus diam. ' +
            'Quam nisl porttitor eget elit ornare pellentesque eget sapien. ' +
            'Eu imperdiet malesuada semper in in purus urna velit. ' +
            'Diam dolor lacinia nunc duis a. Sit sit libero blandit ante tristique velit. ' +
            'Vestibulum cursus morbi sed egestas sed viverra sagittis cras.',
    },
    {
        id: 3,
        name: "Комплект премиальных чехлов на сидения",
        price: 4500,
        apPrice: 1800,
        currentPrice: 3900,
        discount: 13,
        favorite: true,

        marketName: "Market_name",
        rating: 4.8,
        ratingDistribution: {
            1: 2,
            2: 4,
            3: 9,
            4: 13,
            5: 86,
        },

        comments: {
            amount: 34,
            images: {
                totalImages: 75,
                image: [
                    {
                        user:{
                            id: 3,
                            username: "user2",
                            email: "user@gmail.com",
                            phone: "+77777777777",
                            apWallet: false,
                            avatarUrl: "user.png"
                        },
                        imageUrl:'/items/carpet.png',
                    },
                ]
            },
            list: [{
                id: 1,
                user:{
                    id: 3,
                    username: "user2",
                    email: "user@gmail.com",
                    phone: "+77777777777",
                    apWallet: false,
                    avatarUrl: "/user.png"
                },
                rating: 4,
                date: '23-05-2024',
                text: 'Lorem ipsum dolor sit amet consectetur. Mattis mattis augue a in egestas pharetra. Vitae nulla nulla lectus nulla pellentesque augue. Quis suspendisse aenean ac tempus velit vulputate sed. Massa sed pellentesque ornare lacus tempus.',
                images: [],
                likes: 94,
                replies: [],
                updatedAt: '23-05-2024',
            }],
        },
        sold: 210,
        article: 15978954613,
        options: ["Эко-кожа", "Алькантара", "Ткань"],
        type: ["Чехлы", "Тюнинг"],
        brand: "SeatCover Pro",
        material: "Эко-кожа",
        images: [
            "/items/steeringWheel.png",
            "/items/case.png",
            "/items/evaCarpet.png",
            "/items/seatCovers.png",
            "/items/wheelItems.png",
            "/items/carpet.png",
            "/items/seatCovers.png",
            "/items/wheelItems.png",
            "/items/carpet.png",
        ],
        description: 'Lorem ipsum dolor sit amet consectetur. ' +
            'Enim lectus et lorem auctor fermentum tellus purus enim. ' +
            'Amet luctus sit mauris non euismod sagittis sit amet suscipit. ' +
            'Quisque morbi scelerisque neque vulputate pharetra est. ' +
            'Sed eleifend elit parturient eleifend scelerisque. ' +
            'Etiam viverra vel amet tincidunt felis. ' +
            'Vel pellentesque aliquam faucibus nisl dignissim nisl justo lacus diam. ' +
            'Quam nisl porttitor eget elit ornare pellentesque eget sapien. ' +
            'Eu imperdiet malesuada semper in in purus urna velit. ' +
            'Diam dolor lacinia nunc duis a. Sit sit libero blandit ante tristique velit. ' +
            'Vestibulum cursus morbi sed egestas sed viverra sagittis cras.',
    },
];

export const items: ItemCard[] = [
    {
        id: 1,
        name: "Качественный перешив руля, ручки кпп",
        price: 2000,
        currentPrice: 1500,
        discount: 25,
        rating: 3.6,
        comments: 382,
        favorite: true,
        images: [
            "/items/steeringWheel.png",
            "/items/case.png",
            "/items/evaCarpet.png",
            "/items/seatCovers.png",
            "/items/wheelItems.png",
            "/items/carpet.png",
        ],
    },
    {
        id: 2,
        name: "Коврики эва ева с бортами, eva с бортиками 3Д",
        price: 3200,
        currentPrice: null,
        discount: null,
        favorite: false,
        rating: 4.5,
        comments: 128,
        images: ["/items/evaCarpet.png"],
    },
    {
        id: 3,
        name: "ITEM 3",
        price: 4500,
        currentPrice: 3900,
        discount: 13,
        rating: 4.8,
        comments: 256,
        favorite: true,
        images: [
            "/items/steeringWheel.png",
            "/items/case.png",
            "/items/evaCarpet.png",
            "/items/seatCovers.png",
            "/items/wheelItems.png",
            "/items/carpet.png",
            "/items/steeringWheel.png",
            "/items/case.png",
        ],
    },
    {
        id: 4,
        name: "ITEM 4",
        price: 1800,
        currentPrice: 1400,
        discount: 22,
        rating: 3.9,
        comments: 97,
        favorite: false,
        images: [
            "/items/seatCovers.png",
            "/items/wheelItems.png",
            "/items/carpet.png",
            "/items/steeringWheel.png",
            "/items/case.png"
        ],
    },
    {
        id: 5,
        name: "ITEM 5",
        price: 5000,
        currentPrice: null,
        discount: null,
        rating: 4.2,
        comments: 412,
        favorite: false,
        images: [
            "/items/steeringWheel.png",
            "/items/case.png",
        ],
    },
    {
        id: 6,
        name: "ITEM 6",
        price: 2300,
        currentPrice: 1900,
        discount: 17,
        rating: 3.5,
        comments: 189,
        favorite: false,
        images: [
            "/items/carpet.png",
            "/items/steeringWheel.png",
            "/items/case.png"
        ],
    },
    {
        id: 7,
        name: "ITEM 7",
        price: 2900,
        currentPrice: null,
        discount: null,
        rating: 4.0,
        comments: 275,
        favorite: false,
        images: [
            "/items/seatCovers.png",
            "/items/wheelItems.png",
        ],
    },
    {
        id: 8,
        name: "ITEM 8",
        price: 3700,
        currentPrice: 3300,
        discount: 11,
        rating: 4.6,
        comments: 132,
        favorite: false,
        images: ["/items/carpet.png"],
    },
    {
        id: 9,
        name: "ITEM 9",
        price: 2600,
        currentPrice: 2200,
        discount: 15,
        rating: 4.1,
        comments: 321,
        favorite: false,
        images: [
            "/items/steeringWheel.png",
            "/items/case.png",
        ],
    },
    {
        id: 10,
        name: "ITEM 10",
        price: 3400,
        currentPrice: null,
        discount: null,
        rating: 3.7,
        comments: 88,
        favorite: false,
        images: ["/items/evaCarpet.png"],
    },
];

export const itemsForRefund: RefundItem[] = [
    {
        id: 1,
        price: 10000,

        status: 'На рассмотрении',
        images: [
            {
                id: 1,
                file: '/items/carpet.png',
                file_type: 'image/png',
                file_name: 'carpet.png',
            }
        ],

        createdAt: new Date("2024-02-14T12:30:00Z"),

    },
    {
        id: 2,
        price: 20000,

        status: 'Одобрено',
        images: [
            {
                id: 1,
                file: '/items/carpet.png',
                file_type: 'image/png',
                file_name: 'carpet.png',
            }
        ],

        createdAt: new Date("2024-02-14T12:30:00Z"),
        comment: "Здравствуйте!  \n" +
            "Ваша онлайн-заявка рассмотрена и подтверждена. Вы можете оформить возврат товара в любом фирменном пункте самовывоза в течение 15 календарных дней с момента утверждения заявки.  \n" +
            "Надеемся, что ваши будущие покупки будут удачными!  \n" +
            "С уважением, Any Parts"
    },
    {
        id: 3,
        price: 5000,

        status: 'Не одобрено',
        images: [
            {
                id: 1,
                file: '/items/carpet.png',
                file_type: 'image/png',
                file_name: 'carpet.png',
            }
        ],

        createdAt: new Date("2024-02-14T12:30:00Z"),
        comment: "Здравствуйте!\n" +
            "\n" +
            "Ваша онлайн-заявка рассмотрена, но, к сожалению, не может быть утверждена. Возврат товара невозможен в соответствии с установленными условиями.\n" +
            "\n" +
            "Если у вас есть дополнительные вопросы, пожалуйста, свяжитесь с нашей поддержкой.\n" +
            "\n" +
            "С уважением, Any Parts"
    },
]