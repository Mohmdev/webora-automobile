import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Apple, CreditCard, Wallet } from 'lucide-react'
import * as React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  InnerDialog,
  InnerDialogContent,
  InnerDialogDescription,
  InnerDialogFooter,
  InnerDialogHeader,
  InnerDialogTitle,
  InnerDialogTrigger,
} from '.'

function PaymentDialogDemo() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState('creditcard')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Payment Dialog</Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="border-b p-4">
          <DialogTitle>Payment</DialogTitle>
          <DialogDescription>
            Please enter your credit card credentials below to complete the
            payment process.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col">
            <Label className="mb-1.5 text-muted-foreground text-xs">
              Card Holder*
            </Label>
            <div className="relative">
              <Input placeholder="Card Holder Name" />
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-1.5 text-muted-foreground text-xs">
              Card Number*
            </Label>
            <div className="relative">
              <Input
                placeholder="Card number"
                className="peer ps-9 [direction:inherit]"
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <CreditCard className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <Label className="mb-1.5 text-muted-foreground text-xs">
                Expiration month and year*
              </Label>
              <Input placeholder="MM/YY" className="[direction:inherit]" />
            </div>
            <div className="flex flex-col">
              <Label className="mb-1.5 text-muted-foreground text-xs">
                CVC*
              </Label>
              <Input placeholder="CVC" className="[direction:inherit]" />
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col items-center justify-between space-y-2 border-t px-4 py-2 sm:flex-row sm:space-y-0">
          <InnerDialog>
            <InnerDialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Payment Method
              </Button>
            </InnerDialogTrigger>
            <InnerDialogContent className="-mt-6 sm:-mt-1 p-0">
              <InnerDialogHeader className="border-b p-4">
                <InnerDialogTitle>Choose a payment method</InnerDialogTitle>
                <InnerDialogDescription>
                  Select your preferred payment option
                </InnerDialogDescription>
              </InnerDialogHeader>

              <div className="flex flex-col gap-4 p-4">
                <RadioGroup
                  value={selectedPaymentMethod}
                  onValueChange={setSelectedPaymentMethod}
                >
                  <button
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-accent ${
                      selectedPaymentMethod === 'creditcard' ? 'bg-accent' : ''
                    }`}
                    onClick={() => setSelectedPaymentMethod('creditcard')}
                    type="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedPaymentMethod('creditcard')
                      }
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <Wallet className="h-5 w-5" />
                      <div>
                        <h3 className="font-medium text-sm">Credit Card</h3>
                        <p className="text-muted-foreground text-sm">
                          Pay with Visa, Mastercard, or American Express
                        </p>
                      </div>
                    </div>
                    <RadioGroupItem value="creditcard" id="creditcard" />
                  </button>
                  <button
                    type="button"
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-accent ${
                      selectedPaymentMethod === 'creditcard2' ? 'bg-accent' : ''
                    }`}
                    onClick={() => setSelectedPaymentMethod('creditcard2')}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedPaymentMethod('creditcard2')
                      }
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <h3 className="font-medium text-sm">PayPal</h3>
                        <p className="text-muted-foreground text-sm">
                          Pay with your PayPal account
                        </p>
                      </div>
                    </div>
                    <RadioGroupItem value="creditcard2" id="creditcard2" />
                  </button>
                  <button
                    type="button"
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-accent ${
                      selectedPaymentMethod === 'applepay' ? 'bg-accent' : ''
                    }`}
                    onClick={() => setSelectedPaymentMethod('applepay')}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedPaymentMethod('applepay')
                      }
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <Apple className="h-5 w-5" />
                      <div>
                        <h3 className="font-medium text-sm">Apple Pay</h3>
                        <p className="text-muted-foreground text-sm">
                          Pay with Apple Pay
                        </p>
                      </div>
                    </div>
                    <RadioGroupItem value="applepay" id="applepay" />
                  </button>
                </RadioGroup>
              </div>

              <InnerDialogFooter className="flex flex-col items-center justify-between space-y-2 border-t px-4 py-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <DialogClose asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Cancel Payment Method
                  </Button>
                </DialogClose>
                <Button className="w-full sm:w-auto">Continue</Button>
              </InnerDialogFooter>
            </InnerDialogContent>
          </InnerDialog>
          <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </DialogClose>
            <Button className="w-full sm:w-auto">Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { PaymentDialogDemo }
