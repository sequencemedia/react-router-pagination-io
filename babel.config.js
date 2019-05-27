module.exports = {
  'compact': true,
  'comments': false,
  'presets': [
    [
      '@babel/env', {
        useBuiltIns: 'entry',
        targets: {
          node: 'current',
          'browsers': [
            'last 2 versions'
          ]
        },
        corejs: '3.1.2'
      }
    ],
    '@babel/react'
  ],
  'plugins': [
    '@babel/transform-runtime',
    '@babel/proposal-export-default-from',
    '@babel/proposal-export-namespace-from',
    '@babel/proposal-do-expressions',
    [
      '@babel/proposal-class-properties',
      {
        loose: false
      }
    ],
    [
      'module-resolver', {
        root: ['./'],
        cwd: 'babelrc',
        'alias': {
          'react-router-pagination-io': './'
        }
      }
    ]
  ]
}
