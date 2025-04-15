import { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from 'react-router-dom';

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Decorative Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full opacity-30 animate-ping"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-300 rotate-45 opacity-20 animate-bounce"></div>
      <div className="absolute bottom-16 left-32 w-20 h-20 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-300 clip-path-triangle opacity-30 animate-spin-slow"></div>

      <Navbar />

      <div className="flex min-h-[80vh] items-center justify-center px-2">
        <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden mt-10 mb-10 relative z-10">
          {/* Left Side Image */}
          <div className="hidden md:flex md:w-1/2 bg-blue-100 items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
              alt="Signup Visual"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right Side Form */}
          <form onSubmit={submitHandler} className="w-full md:w-1/2 p-8 space-y-6">
            <h1 className="font-bold text-2xl text-center mb-2 text-gray-800">Create an account</h1>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  value={input.fullName}
                  name="fullName"
                  onChange={changeEventHandler}
                  placeholder="Vincenzo Cassano"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="vincenzo@gmail.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="1234567890"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <Label>Role</Label>
                <RadioGroup
                  value={input.role}
                  onValueChange={(value) => setInput({ ...input, role: value })}
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recruiter" id="recruiter" />
                    <Label htmlFor="recruiter">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="profile">Profile Picture</Label>
                <Input
                  id="profile"
                  accept="image/*"
                  type="file"
                  name="file"
                  onChange={changeFileHandler}
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-4">Signup</Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
