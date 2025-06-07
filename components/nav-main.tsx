"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { useRef } from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useSidebarItemCursorEffect } from "@/hooks/use-sidebar-cursor"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(
          (item) =>
            item.items?.length ? (
              <SidebarMenuSub key={item.title}>
                <Collapsible>
                  <EnhancedSidebarMenuButton item={item} />
                  <SidebarMenuSubItem>
                    <CollapsibleContent>
                      {item.items.map((subItem) => (
                        <EnhancedSidebarMenuSubButton
                          key={subItem.title}
                          item={subItem}
                        />
                      ))}
                    </CollapsibleContent>
                  </SidebarMenuSubItem>
                </Collapsible>
              </SidebarMenuSub>
            ) : (
              <EnhancedSidebarMenuItem key={item.title} item={item} />
            )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}

// Enhanced components with cursor effects
function EnhancedSidebarMenuItem({
  item,
}: {
  item: { title: string; url: string; icon?: LucideIcon; isActive?: boolean }
}) {
  const ref = useRef<HTMLLIElement>(null)
  useSidebarItemCursorEffect(ref, item.title)

  return (
    <SidebarMenuItem ref={ref}>
      <SidebarMenuButton
        isActive={item.isActive}
        asChild
      >
        <a href={item.url}>
          {item.icon && <item.icon className="h-4 w-4 mr-2" />}
          {item.title}
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function EnhancedSidebarMenuButton({
  item,
}: {
  item: { title: string; url: string; icon?: LucideIcon; isActive?: boolean }
}) {
  const ref = useRef<HTMLButtonElement>(null)
  useSidebarItemCursorEffect(ref, item.title)

  return (
    <CollapsibleTrigger asChild>
      <SidebarMenuButton
        ref={ref}
        isActive={item.isActive}
      >
        {item.icon && <item.icon className="h-4 w-4 mr-2" />}
        {item.title}
        <ChevronRight className="h-4 w-4 ml-auto" />
      </SidebarMenuButton>
    </CollapsibleTrigger>
  )
}

function EnhancedSidebarMenuSubButton({
  item,
}: {
  item: { title: string; url: string }
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  useSidebarItemCursorEffect(ref, item.title)

  return (
    <SidebarMenuSubButton asChild>
      <a ref={ref} href={item.url}>
        {item.title}
      </a>
    </SidebarMenuSubButton>
  )
}
