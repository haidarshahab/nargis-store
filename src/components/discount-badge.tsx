import { cn } from "@/lib/utils"

interface DiscountBadgeProps {
  price: number
  comparePrice: number
  className?: string
}

export function DiscountBadge({ price, comparePrice, className }: DiscountBadgeProps) {
  const discount = Math.round(((comparePrice - price) / comparePrice) * 100)
  
  if (discount <= 0) return null
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-50 text-red-600",
        className
      )}
    >
      -{discount}%
    </span>
  )
}
