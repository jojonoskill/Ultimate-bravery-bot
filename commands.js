const commands = [
    {
        name: 'troll',
        description: 'gives you an opportunity to troll your games',
        options: [
            {
                name: 'role',
                description: 'choose your role to troll, select random for a random role',
                type: 3,
                required:true,
                choices: [
                    {
                        name: "top",
                        value: "Top",
                    },
                    {
                        name: "jungle",
                        value: "Jungle",
                    },
                    {
                        name: "mid",
                        value: "Mid",
                    },
                    {
                        name: "bot",
                        value: "Bot",
                    },
                    {
                        name: "support",
                        value: "Support",
                    },
                    {
                        name: "random",
                        value: "Random",
                    }
                ]
            }
        ]
    },
    {
        name:'ubgame',
        description: 'new ubgame for u and your homies',
    },
    {
        name:'randomizer',
        description: 'random',
        options : [
            {
                name: "game1",
                description: "First game type",
                type: 3,
                required: true,
            },
            {
                name: "game2",
                description: "Second game type",
                type: 3,
                required: true,
            },
            {
                name: "game3",
                description: "Third game type",
                type: 3,
                required: false,
            },
            {
                name: "game4",
                description: "четыре",
                type: 3,
                required: false,
            },
            {
                name: "game5",
                description: "пять",
                type: 3,
                required: false,
            },
            {
                name: "game6",
                description: "шесть",
                type: 3,
                required: false,
            },
            {
                name: "game7",
                description: "okok",
                type: 3,
                required: false,
            },
            {
                name: "game8",
                description: "okok",
                type: 3,
                required: false,
            },
            {
                name: "game9",
                description: "okok",
                type: 3,
                required: false,
            },
            {
                name: "game10",
                description: "up to 10 games only",
                type: 3,
                required: false,
            },


        ]
    }
];

module.exports = commands;