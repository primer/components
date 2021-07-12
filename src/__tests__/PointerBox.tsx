import React from 'react'
import {PointerBox} from '..'
import {render, behavesAsComponent, checkExports} from '../utils/testing'
import {render as HTMLRender, cleanup} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'
import 'babel-polyfill'
expect.extend(toHaveNoViolations)

describe('PointerBox', () => {
  behavesAsComponent({Component: PointerBox})

  checkExports('PointerBox', {
    default: PointerBox
  })

  it('renders a <Caret> in <BorderBox> with relative positioning', () => {
    expect(render(<PointerBox />)).toMatchSnapshot()
  })

  it('should have no axe violations', async () => {
    const {container} = HTMLRender(<PointerBox />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    cleanup()
  })

  it('passes the "borderColor" prop to both <BorderBox> and <Caret>', () => {
    expect(render(<PointerBox borderColor="border.danger" />)).toMatchSnapshot()
  })

  it('passes the "bg" prop to both <BorderBox> and <Caret>', () => {
    expect(render(<PointerBox bg="bg.danger" />)).toMatchSnapshot()
  })
})
