module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
          browsers: [
            'last 4 versions',
            'safari >= 9',
            'ios >= 8',
            'ie >= 9',
            '> 2%'
          ]
        },
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    '@babel/react'
  ],
  overrides: [
    {
      test: /\.mts$|\.cts$|\.tsx$/,
      presets: [
        '@babel/typescript',
        [
          '@babel/env',
          {
            targets: {
              node: 'current',
              browsers: [
                'last 4 versions',
                'safari >= 9',
                'ios >= 8',
                'ie >= 9',
                '> 2%'
              ]
            },
            useBuiltIns: 'usage',
            corejs: 3
          }
        ],
        '@babel/react'
      ],
      plugins: [
        '@babel/transform-typescript'
      ]
    }
  ]
}
