const Config = {
    Routers: {
        NotFound: "*",
        Home: "//*",
        Teams: {
            Index: "teams",
            Havea: "havea",
        }
    },
    Links: {
        Home: "/",
        Teams: {
            Index: "/teams",
            Havea: "/teams/havea",
        }
    },
    SwapSwitch: {
        FromTo: 0,
        ToFrom: 1
    }
};

export default Config;