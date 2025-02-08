import { Clock, Shield, DollarSign } from "lucide-react"

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">A whole world of professional TALENTS at your fingertips</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <DollarSign className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">The best for every budget</h3>
                  <p className="text-gray-600">
                    Find high-quality services at every price point. Both at hourly rates and fixed-price projects.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">Quality work done quickly</h3>
                  <p className="text-gray-600">
                    Find the right freelancer to begin working on your project within minutes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Shield className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">Protected payments, every time</h3>
                  <p className="text-gray-600">
                    Always know what you'll pay upfront. Your payment isn't released until you approve the work.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <img
              src="https://demo.yo-gigs.com/image/editor-image/1695726618-700x600.jpg"
              alt="Professional at work"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

