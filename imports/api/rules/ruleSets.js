const RuleSets = [
    {
        version: 1.0,
        depthModifiers: {
            1: 1,
            2: 0.25,
            3: 0.005,
            4: 0.0001,
            5: 0.000001
        },
        values: {
            like: {
                acting: {
                    value: 0.0025,
                    depth: 3
                },
                target: {
                    value: 0.001,
                    depth: 3
                }
            },
            unlike: {
                acting: {
                    value: -0.0025,
                    depth: 3
                },
                target: {
                    value: -0.001,
                    depth: 3
                }
            },
            dislike: {
                acting: {
                    value: -0.0025,
                    depth: 3
                },
                target: {
                    value: -0.005,
                    depth: 3
                }
            },
            undislike: {
                acting: {
                    value: 0.0025,
                    depth: 3
                },
                target: {
                    value: 0.005,
                    depth: 3
                }
            },
            follow: {
                acting: {
                    value: 0,
                    depth: 3
                },
                target: {
                    value: 0.01,
                    depth: 3
                }
            },
            unfollow: {
                acting: {
                    value: 0,
                    depth: 3
                },
                target: {
                    value: -0.01,
                    depth: 3
                }
            },
            share: {
                acting: {
                    value: 0.0001,
                    depth: 3
                },
                target: {
                    value: 0.005,
                    depth: 3
                }
            },
            ostracize: {
                acting: {
                    value: -0.5,
                    depth: 3
                },
                target: {
                    value: -0.5,
                    depth: 3
                }
            }
        }
    }
];
export default RuleSets;
