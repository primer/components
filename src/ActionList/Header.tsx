import React from 'react'
import styled, {css} from 'styled-components'
import {get} from '../constants'

/**
 * Contract for props passed to the `Header` component.
 */
export interface HeaderProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Style variations. Usage is discretionary.
   *
   * - `"filled"` - Superimposed on a background, offset from nearby content
   * - `"subtle"` - Relatively less offset from nearby content
   */
  variant: 'subtle' | 'filled'

  /**
   * Primary text which names a `Group`.
   */
  title: string

  /**
   * Secondary text which provides additional information about a `Group`.
   */
  auxiliaryText?: string
}

const StyledHeader = styled.div<{variant: HeaderProps['variant']}>`
   {
    /* 6px vertical padding + 20px line height = 32px total height
     *
     * TODO: When rem-based spacing on a 4px scale lands, replace
     * hardcoded '6px' with 'calc((${get('space.s32')} - ${get('space.20')}) / 2)'.
     */
  }
  padding: 6px ${get('space.2')};
  margin-left: ${get('space.2')};
  margin-right: ${get('space.2')};
  font-size: ${get('fontSizes.0')};
  font-weight: ${get('fontWeights.bold')};
  color: ${get('colors.text.secondary')};

  ${({variant}) =>
    variant === 'filled' &&
    css`
      background: ${get('colors.bg.tertiary')};
      margin: ${get('space.2')} -${get('space.2')};
      border-top: 1px solid ${get('colors.border.tertiary')};
      border-bottom: 1px solid ${get('colors.border.tertiary')};

      &:first-child {
        margin-top: 0;
      }
    `}
`

/**
 * Displays the name and description of a `Group`.
 */
export function Header({variant, title, auxiliaryText, children: _children, ...props}: HeaderProps): JSX.Element {
  return (
    <StyledHeader role="heading" variant={variant} {...props}>
      {title}
      {auxiliaryText && <span>auxiliaryText</span>}
    </StyledHeader>
  )
}