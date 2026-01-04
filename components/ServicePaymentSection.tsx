"use client";

export default function ServicePaymentSection() {
  return (
    <section className="bg-white border-t">
      <div className="max-w-7xl mx-auto">

        {/* TOP INFO ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-b">
          
          {/* Free Shipping */}
          <div className="flex items-center gap-4 p-6 border-r">
            <img
              src="/icons/shipping.png"
              alt="Free Shipping"
              className="w-10 h-10"
            />
            <div>
              <p className="font-semibold">Free Shipping</p>
              <p className="text-sm text-gray-500">
                On Orders Above ₹399
              </p>
            </div>
          </div>

          {/* COD */}
          <div className="flex items-center gap-4 p-6 border-r">
            <img
              src="/icons/cod.png"
              alt="COD Available"
              className="w-10 h-10"
            />
            <div>
              <p className="font-semibold">COD Available</p>
              <p className="text-sm text-gray-500">
                @ ₹40 Per Order
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center justify-between p-6">
            <p className="font-semibold text-lg">
              Have Queries or Concerns?
            </p>
            <button className="border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition px-6 py-2 rounded-md font-semibold">
              CONTACT US
            </button>
          </div>

        </div>

        {/* PAYMENT ROW */}
        <div className="p-6">
          <p className="flex items-center gap-2 text-green-600 font-medium mb-4">
            <span className="text-lg">✔</span>
            100% Payment Protection, Easy Return Policy
          </p>

          {/* PAYMENT ICONS */}
          <div className="flex flex-wrap items-center gap-4">
            {[
              "upi",
              "phonepe",
              "gpay",
              "paytm",
              "mobikwik",
              "visa",
              "mastercard",
              "amex",
              "rupay",
              "netbanking",
            ].map((icon) => (
              <img
                key={icon}
                src={`/payments/${icon}.png`}
                alt={icon}
                className="h-8 object-contain"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
