"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import type React from "react";

interface ReportDialogProps {
  trigger?: React.ReactNode;
}

export default function ReportDialog({ trigger }: ReportDialogProps) {
  const [report, setReport] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (!report.trim()) {
      setError("Vui lòng nhập nội dung báo cáo");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setReport("");
      setOpen(false);

      // show success toast ở đây nếu cần
    } catch (err) {
      setError("Đã xảy ra lỗi khi gửi báo cáo. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" size="sm">
            Báo cáo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Báo cáo vấn đề</DialogTitle>
          <DialogDescription>
            Vui lòng mô tả chi tiết vấn đề bạn gặp phải. Chúng tôi sẽ xem xét
            báo cáo của bạn.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Mô tả vấn đề của bạn..."
            className="min-h-[120px]"
            value={report}
            onChange={(e) => setReport(e.target.value)}
          />
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-500">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Đang gửi..." : "Gửi báo cáo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
