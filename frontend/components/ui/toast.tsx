import * as React from "react"

export interface ToastActionElement {
  altText: string
}

export interface ToastProps {
  id?: string
  title?: string
  description?: string
  action?: ToastActionElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Toast = React.forwardRef<
  HTMLDivElement,
  ToastProps
>(({ ...props }, ref) => {
  return <div ref={ref} {...props} />
})

Toast.displayName = "Toast"

export const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    altText: string
  }
>(({ altText, ...props }, ref) => {
  return <button ref={ref} {...props} />
})

ToastAction.displayName = "ToastAction"

export const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return <button ref={ref} {...props} />
})

ToastClose.displayName = "ToastClose"

export const ToastTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return <div ref={ref} {...props} />
})

ToastTitle.displayName = "ToastTitle"

export const ToastDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return <div ref={ref} {...props} />
})

ToastDescription.displayName = "ToastDescription" 