import expect from 'expect'
import React from 'react'
import {renderToStaticMarkup as render} from 'react-dom/server'

import { DidomiSDK } from 'src/'

describe('DidomiSDK', () => {
  it('renders properly', () => {
    expect(render(<DidomiSDK/>))
      .toContain('')
  })

})