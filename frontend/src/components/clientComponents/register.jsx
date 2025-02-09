
import { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export function Register({ onClose, openLogin }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()


    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            firstName,
            lastName,
            phone,
            email, 
            password,

        }),
      })

      if (response.ok) {
        alert("Registration successful! Please login.")
        onClose()
        openLogin() // Automatically open login after successful registration
      } else {
        const errorData = await response.json()
        alert("Registration failed: " + errorData.message)
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                FirstName
              </label>
              <Input
                type="text"
                id="firstName"
                placeholder="enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                LastName
              </label>
              <Input
                type="text"
                id="lastName"
                placeholder="enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                type="text"
                id="phone"
                placeholder="+212 123 456 789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="alex@dummyid.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
        
              </div>
            </div>


            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Sign Up
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button onClick={openLogin} className="font-medium text-green-600 hover:underline">
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
