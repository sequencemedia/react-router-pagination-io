module.exports = {
  compact: true,
  comments: false,
  presets: [
    [
      '@babel/env', {
        targets: {
          node: 'current',
          browsers: [
            'last 2 versions'
          ]
        },
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    [
      '@babel/react',
      {
        runtime: 'automatic'
      }
    ]
  ],
  plugins: [
    [
      'module-resolver', {
        alias: {
          'react-router-pagination-io': '.'
        }
      }
    ]
  ]
}
