import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { MapPin, Star } from "lucide-react"


export default function JobDetails() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">NICU Nurse</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mhv0SfZ4pMU1SMg9aAWvjAcszle7p2.png"
                  alt="Nicola"
                />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <span>
                Posted by: <span className="underline">Nicola</span>
              </span>
            </div>
            <div>Posted: Sep 13, 2024</div>
            <div>Last date: Jun 08, 2029</div>
            <Badge variant="success" className="bg-green-500">
              Open
            </Badge>
          </div>
        </div>

        {/* Main content and sidebar */}
        <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
          {/* Main content */}
          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-semibold">About the job</h2>
              <ul className="space-y-4">
                <li className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-500"></span>
                  <p>
                    Neonatal Care: Give premature and severely ill neonates admitted to the NICU specialized nursing
                    care, including monitoring, medication administration, and assessments.
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-500"></span>
                  <p>
                    Effectively oversee and regulate ventilated neonates by making sure the right settings, checks, and
                    modifications are made to maximize respiratory support.
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-500"></span>
                  <p>
                    Vital Sign Monitoring: Keep track of a newborn's vital signs, growth metrics, and therapy reactions.
                    As soon as something changes, let the medical professionals know.
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-500"></span>
                  <p>
                    Help with feeding: Provide assistance with nursing, bottle feeding, or tube feeding premature and
                    low birth weight babies.
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold">Job instructions</h2>
              <ul className="space-y-4">
                <li className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-500"></span>
                  <p>
                    Family Support: Provide parents and families with emotional support, advice on newborn care, and the
                    creation of a warm and cozy environment.
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-500"></span>
                  <p>
                    Sustain a clean and safe NICU environment by adhering to stringent infection control procedures.
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-500"></span>
                  <p>
                    Medication Administration: Give prescription drugs to newborns in a precise and secure manner while
                    following hospital guidelines and the Five Rights of Medication Administration.
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-500"></span>
                  <p>
                    Collaborative Care: To guarantee that neonates receive complete care, collaborate closely with
                    pediatricians, neonatologists, and other medical specialists.
                  </p>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-500"></span>
                  <p>
                    Parent Education: Inform parents on safe procedures for the baby's wellbeing, developmental
                    milestones, and neonatal care.
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold">Skills & expertise required</h2>
              <div className="mb-6">
                <h3 className="mb-2 font-medium">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Collaborative Teamwork",
                    "Documentation",
                    "Family Centered Care",
                    "Intravenous Therapy",
                    "Medication Administration",
                    "Neonatal Assessment",
                    "Neonatal Resuscitation",
                    "Neurodevelopmental Care",
                    "Respiratory Care",
                    "Temperature Regulation",
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-green-50 text-green-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="mb-2 font-medium">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    NICU Nurse
                  </Badge>
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-medium">Spoken languages</h3>
                <div className="flex flex-wrap gap-2">
                  {["English", "French"].map((language) => (
                    <Badge key={language} variant="secondary" className="bg-green-50 text-green-700">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="mb-6">
                <div className="text-sm text-muted-foreground">Offer price</div>
                <div className="text-3xl font-bold">$ 43.00</div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Job type</span>
                  <span>Task</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Task type</span>
                  <span>Biddable</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated date/time</span>
                  <span>Jun 09, 2029 (20:30)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Job views</span>
                  <span>2</span>
                </div>
              </div>

              <Button className="mt-6 w-full bg-green-500 hover:bg-green-600">Open</Button>
            </Card>

            <Card className="p-6">
              <div className="mb-6 flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mhv0SfZ4pMU1SMg9aAWvjAcszle7p2.png"
                    alt="Nicola"
                  />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">Nicola</h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Algeria</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.33/5 (3)</span>
                  </div>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-sm text-muted-foreground">Job(s) posted</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">0%</div>
                  <div className="text-sm text-muted-foreground">Job success</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Total spent</div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View profile
              </Button>
            </Card>

            <Card className="p-6 text-center">
              <h3 className="mb-4 text-xl font-semibold">Want to hire for a similar type of job?</h3>
              <p className="mb-6 text-muted-foreground">
                If you are looking for professionals to work on a job that is similar to this, create a job post to
                reach out to the right talent here.
              </p>
              <Button className="w-full bg-[#0A0F29] text-white hover:bg-[#0A0F29]/90">Post a job like this</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

