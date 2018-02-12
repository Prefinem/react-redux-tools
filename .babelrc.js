{
    "plugins": [
        "transform-async-to-generator",
        "transform-es2015-modules-commonjs",
        "transform-object-rest-spread"
    ],
    "presets": [
        [
            "env",
            {
                "targets": {
                    "browsers": [
                        "last 2 versions",
                        "ie 11",
                        "ie 10"
                    ]
                }
            }
        ],
        [
            "react"
        ],
        [
            "stage-2"
        ]
    ]
}