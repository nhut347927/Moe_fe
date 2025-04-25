"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"

interface DeleteConfirmationDialogProps {
  title?: string
  description?: string
  itemName?: string
  onConfirm: () => Promise<void> | void
  trigger?: React.ReactNode
}

export default function DeleteConfirmationDialog({
  title = "Xác nhận xóa",
  description = "Bạn có chắc chắn muốn xóa mục này không? Hành động này không thể hoàn tác.",
  itemName,
  onConfirm,
  trigger,
}: DeleteConfirmationDialogProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    setIsDeleting(true)
    try {
      await onConfirm()
      setOpen(false)
    } catch (error) {
      console.error("Lỗi khi xóa:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Xóa
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {itemName
              ? `Bạn có chắc chắn muốn xóa "${itemName}" không? Hành động này không thể hoàn tác.`
              : description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isDeleting}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isDeleting}>
            {isDeleting ? "Đang xóa..." : "Xác nhận xóa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

