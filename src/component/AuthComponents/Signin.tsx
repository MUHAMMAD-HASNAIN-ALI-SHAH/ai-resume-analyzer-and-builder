import { signIn } from "@/lib/auth";

const Signin = () => {
  return (
    <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-5 lg:justify-between h-screen bg-linear-to-br from-blue-100 via-blue-200 to-blue-300 p-6 md:px-16 overflow-hidden select-none">
      {/* Left Side Content */}
      <div className="lg:w-1/2 w-full lg:px-16 mb-10 lg:mb-0 z-10 text-center lg:text-left">
        {/* Logo */}
        <div className="flex items-center justify-center lg:justify-start mb-6">
          <div className="w-14 h-14 bg-white shadow-md rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="ml-3 text-xl sm:text-2xl font-semibold text-blue-800">
            Resume Werse
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-900">
          Welcome to Resume Werse
        </h1>
        <p className="text-gray-700 text-sm sm:text-base max-w-md mx-auto lg:mx-0">
          Create your account to start building your resume. Please fill out the
          form below with your details.
        </p>
      </div>

      {/* Right Curved Clouds - hidden on mobile */}
      <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full overflow-hidden pointer-events-none">
        <div className="absolute bg-white opacity-60 rounded-full w-[500px] h-[300px] top-20 -right-40 blur-3xl"></div>
        <div className="absolute bg-white opacity-50 rounded-full w-[400px] h-[200px] top-40 right-0 translate-x-1/4 blur-2xl"></div>
        <div className="absolute bg-white opacity-40 rounded-full w-[250px] h-[120px] top-56 right-1/4 blur-2xl"></div>
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 z-20">
        <h2 className="text-lg text-black sm:text-xl font-semibold mb-4 text-center lg:text-left">
          Welcome back
        </h2>
        <h1 className="text-base sm:text-lg font-semibold mb-4 text-blue-800 text-center lg:text-left">
          Signin/Signup to your account
        </h1>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            type="submit"
            className="my-3 text-black cursor-pointer w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 bg-white hover:bg-gray-100 transition text-sm sm:text-base"
          >
            {/* Google Logo */}
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 533.5 544.3"
            >
              <path
                d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272.1v95.4h147.3c-6.4 34.6-25.6 63.9-54.5 83.4v68h88c51.4-47.4 80.6-117.3 80.6-196.4z"
                fill="#4285F4"
              />
              <path
                d="M272.1 544.3c73.5 0 135.2-24.3 180.3-65.9l-88-68c-24.4 16.3-55.6 26-92.3 26-70.9 0-131-47.9-152.5-112.1h-90.7v70.4c45.2 89.3 137.8 149.6 243.2 149.6z"
                fill="#34A853"
              />
              <path
                d="M119.6 324.3c-10.9-32.5-10.9-67.9 0-100.4V153.5h-90.7c-39.2 78.5-39.2 171.9 0 250.4l90.7-70z"
                fill="#FBBC05"
              />
              <path
                d="M272.1 107.7c38.8-.6 75.9 13.7 104.3 39.5l77.7-77.7C364.9 24.3 303.2 0 229.7 0 124.3 0 31.7 60.3-13.5 149.6l90.7 70.4c21.5-64.2 81.6-112.3 152.5-112.3z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
