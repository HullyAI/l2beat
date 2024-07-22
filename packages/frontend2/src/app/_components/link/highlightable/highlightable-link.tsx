'use client'

import { cn } from '~/utils/cn'
import { CustomLink } from '../custom-link'
import { useHiglightableLinkContext } from './highlightable-link-context'

export function HighlightableLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CustomLink<'a'>>) {
  const { current, setCurrent } = useHiglightableLinkContext()

  return (
    <CustomLink
      {...props}
      className={cn(
        className,
        current === props.href && [
          'relative z-10',
          'before:absolute before:-left-1 before:-top-0.5 before:-bottom-0.5 before:-right-1',
          'before:-z-10 before:border before:rounded',
          'before:border-yellow-700 before:border-dashed before:bg-yellow-250/50 before:content-[""]',
          'before:dark:border-yellow-250 before:dark:bg-yellow-250/10',
        ],
      )}
      onMouseEnter={() => setCurrent(props.href)}
      onMouseLeave={() => setCurrent(undefined)}
    />
  )
}
