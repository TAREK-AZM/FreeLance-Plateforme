import { Button } from "../ui/button"

export default function BusinessSection() {
  return (
    <section className="py-16 bg-navy-900">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 ">
          <div className="space-y-8">
            <span className="text-black">Yo!Gigs Business For Clients</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-black">Are you an employer looking to hire talent?</h2>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-black">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-500">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Millions of professionals to choose from
              </li>
              <li className="flex items-center gap-3 text-black">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-500">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Post multiple jobs, and get several bids
              </li>
              <li className="flex items-center gap-3 text-black">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-500">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Get notified for every action taken on your job posting
              </li>
            </ul>

            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Hire Talent
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[#FFF3E0] rounded-lg p-6">
              <h3 className="font-bold mb-4">Search</h3>
              <p className="text-sm">Post a job and search for the best match from several verified professionals.</p>
              <Button variant="link" className="mt-4">Start Exploring</Button>
            </div>

            <div className="bg-[#FFE4E6] rounded-lg p-6">
              <h3 className="font-bold mb-4">Hire</h3>
              <p className="text-sm">Hire the best match for your project & get started instantly.</p>
              <Button variant="link" className="mt-4">Hire Talent</Button>
            </div>

            <div className="bg-[#E0F2F1] rounded-lg p-6">
              <h3 className="font-bold mb-4">Feedback</h3>
              <p className="text-sm">After the job is completed, leave an honest feedback & repeat.</p>
              <Button variant="link" className="mt-4">Give Feedback</Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

