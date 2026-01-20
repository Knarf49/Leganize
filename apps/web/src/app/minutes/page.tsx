import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronLeft, Download, FileText, Share2 } from "lucide-react";

export default function MinutePage() {
  return (
    <div className="pt-20 pb-32">
      <nav className="fixed top-16 left-0 right-0 bg-white z-60 flex w-full justify-between border-b-2 mb-6 h-15 px-6">
        <div className="flex items-center">
          <ChevronLeft />
          <div className="ml-6">
            <h2 className="text-xl font-semibold">Minutes Preview</h2>
            <p className="text-primary/50">AI-generated draft</p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <Share2 className="h-full text-gray-500" />
          <Download className="h-full text-gray-500" />
        </div>
      </nav>
      <div className="px-6">
        <Alert className="border-l-6 border-l-primary/40 shadow-sm flex items-center gap-x-6">
          <div className="bg-primary/10 size-fit p-2 text-center rounded-full text-primary/40 font-semibold">
            <FileText />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Draft Resolutions</h2>
            <p className="text-primary/50">
              Review and edit before finalizing. Langusge uses safe, neutral
              legal wording.
            </p>
          </div>
        </Alert>

        <ScrollArea className="h-91.25 w-full rounded-md border p-4">
          <Accordion type="multiple" className="w-full space-y-5 mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Information</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Our flagship product combines cutting-edge technology with
                  sleek design. Built with premium materials, it offers
                  unparalleled performance and reliability.
                </p>
                <p>
                  Key features include advanced processing capabilities, and an
                  intuitive user interface designed for both beginners and
                  experts.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping Details</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  We offer worldwide shipping through trusted courier partners.
                  Standard delivery takes 3-5 business days, while express
                  shipping ensures delivery within 1-2 business days.
                </p>
                <p>
                  All orders are carefully packaged and fully insured. Track
                  your shipment in real-time through our dedicated tracking
                  portal.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Return Policy</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  We stand behind our products with a comprehensive 30-day
                  return policy. If you&apos;re not completely satisfied, simply
                  return the item in its original condition.
                </p>
                <p>
                  Our hassle-free return process includes free return shipping
                  and full refunds processed within 48 hours of receiving the
                  returned item.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Return Policy</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  We stand behind our products with a comprehensive 30-day
                  return policy. If you&apos;re not completely satisfied, simply
                  return the item in its original condition.
                </p>
                <p>
                  Our hassle-free return process includes free return shipping
                  and full refunds processed within 48 hours of receiving the
                  returned item.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Return Policy</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  We stand behind our products with a comprehensive 30-day
                  return policy. If you&apos;re not completely satisfied, simply
                  return the item in its original condition.
                </p>
                <p>
                  Our hassle-free return process includes free return shipping
                  and full refunds processed within 48 hours of receiving the
                  returned item.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Return Policy</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  We stand behind our products with a comprehensive 30-day
                  return policy. If you&apos;re not completely satisfied, simply
                  return the item in its original condition.
                </p>
                <p>
                  Our hassle-free return process includes free return shipping
                  and full refunds processed within 48 hours of receiving the
                  returned item.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>

        <div className="fixed bottom-16 left-0 right-0 z-10 px-6 py-4">
          <Button className="py-6 w-full">
            <Check />
            <span className="text-lg font-normal">
              Confirm & Generate Final Minutes
            </span>
          </Button>
          <h2 className="w-full text-center text-primary/50 mt-4">
            Final minutes will be formatted for signature
          </h2>
        </div>
      </div>
    </div>
  );
}
