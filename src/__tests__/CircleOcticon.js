import React from 'react'
import CircleOcticon from '../CircleOcticon'
import {render, rendersClass} from '../utils/testing'
import {Check} from '@githubprimer/octicons-react'

describe('CircleOcticon', () => {
  it('renders a <div> with width and height', () => {
    expect(render(<CircleOcticon icon={Check} size={10} />).props.style).toEqual({width: '10px', height: '10px'})
  })

  it('adds the "circle" class', () => {
    expect(rendersClass(<CircleOcticon icon={Check} />, 'circle')).toBe(true)
  })

  it('does not add a bg class by default', () => {
    expect(render(<CircleOcticon icon={Check} />).props.className).not.toMatch(/\bbg-/)
  })

  it('adds the appropriate bg class for the "bg" prop', () => {
    expect(rendersClass(<CircleOcticon icon={Check} bg="red.5" />, 'bg-red-5')).toBe(true)
  })

  it('does not add a text class by default', () => {
    expect(render(<CircleOcticon icon={Check} />).props.className).not.toMatch(/\btext-/)
  })

  it('adds the appropriate text class for the "color" prop', () => {
    expect(render(<CircleOcticon icon={Check} color="red.5" />)).toHaveClass('color-red-5')
  })

  it('has a default size', () => {
    expect(render(<CircleOcticon icon={Check} />).props.style).toEqual({width: '32px', height: '32px'})
  })

  it('respects margin utility prop', () => {
    expect(rendersClass(<CircleOcticon icon={Check} m={4} />, 'm-4')).toEqual(true)
  })

  it('respects padding utility prop', () => {
    expect(rendersClass(<CircleOcticon icon={Check} p={4} />, 'p-4')).toEqual(true)
  })
})
