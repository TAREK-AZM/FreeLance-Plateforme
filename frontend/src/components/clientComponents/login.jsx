
import { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { useAuthStore } from '../../store/store'

export function Login({ onClose, openRegister }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { isAuthenticated, user, login } = useAuthStore()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const userData = await response.json()
        login(userData) // Update the auth store with the user data
        onClose() // Close the login modal
      } else {
        const errorData = await response.json()
        console.error('Login failed:', errorData.message)
        alert('Login failed: ' + errorData.message)
      }
    } catch (error) {
      console.error('Error during login:', error)
      alert('An error occurred during login. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <div className=" md:p8 p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>


          <form onSubmit={handleLogin} className="space-y-4">
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
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 mb-6">
              <div className="flex items-center">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-green-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Login
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Do not have an account?{" "}
            <a href="#" className="font-medium text-green-600 hover:underline" onClick={openRegister}>
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}