import { useState } from 'react';
import './App.css';

function App() {
  const initials = { fullName: "", email: "", phone: "", password: "", gender: "", age: "", comments: "" };
  const [formstate, setFormState] = useState(initials);
  const [error, setError] = useState({});

  const [showpassword, setShowpassword] = useState('password');
  const [showmessage, setShowmessage] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formstate, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(formstate));
  }

  const validate = (value) => {
    const errors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passwordLength = 8;
    const phoneLength = 10;
    if (!value.fullName) {
      errors.fullName = "Name required";
    }
    if (value.email === "") {
      errors.email = "Email required";
    } else if (!emailRegex.test(value.email)) {
      errors.email = "please enter valid email address";
    }
    if (!value.phone) {
      errors.phone = "Phone number required";
      if (value.phone.length != phoneLength) {
        errors.phone = "Enter 10 digit number"
      }
    }
    if (!value.password) {
      errors.password = "Password required";
    } else if (value.password.length < passwordLength) {
      errors.password = "Enter minimum 8 charaters long password"
    }
    return errors;
  }

  const handleShowPassword = () => {
    if (showpassword === "password") {
      setShowpassword("text");
    } else {
      setShowpassword("password");
    }
  }

  console.log(formstate, 'state')
  console.log(error, 'error')

  return (
    <div class="h-screen flex flex-col items-center justify-center bg-slate-500">
      {showmessage ? <form class="md:w-2/5 flex flex-col p-4 gap-4 bg-white rounded-xl" onSubmit={handleSubmit} noValidate>
        <h4 class="text-3xl font-bold">Exposim Form</h4>
        <div>
          <label class="block text-gray-500 font-bold mb-1 md:mb-0" for="fullName">
            Name
          </label>
          <input class="form-control bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder='Your name' name='fullName' onChange={handleChange} noValidate />
          <span className='text-red-700 text-sm'>{error.fullName}</span>
        </div>
        <div class="md:flex gap-6">
          <div class="md:w-1/2">
            <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="email">
              Email
            </label>
            <input pattern={'/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i'} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name='email' type="email" placeholder='email@gmail.com' onChange={handleChange} noValidate />
            <span className='text-red-700 text-sm'>{error.email}</span>
          </div>
          <div class="md:w-1/2">
            <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="phone">
              Phone
            </label>
            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder='0987654321' name="phone" type="number" onChange={handleChange} noValidate />
            <span className='text-red-700 text-sm'>{error.phone}</span>
          </div>
        </div>
        <div class="md:flex gap-6">
          <div class="md:w-1/2">
            <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="gender">
              Gender
            </label>
            <div class="flex">
              <div className="flex items-center pl-4">
                <input id="male" type="radio" value="male" name="radio" onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500" />
                <label for="male" className="w-full py-2 ml-2 text-sm font-medium text-gray-400">Male</label>
              </div>
              <div className="flex items-center pl-4">
                <input id="female" type="radio" value="female" name="radio" onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500" />
                <label for="female" className="w-full py-2 ml-2 text-sm font-medium text-gray-400">Female</label>
              </div>
            </div>
          </div>
          <div class="md:w-1/2">
            <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="age">
              Age
            </label>
            <select onChange={handleChange} class="bg-gray-200 border border-gray-300 text-sm rounded-lg focus:outline-none focus:bg-white focus:border-purple-500 block w-full p-2.5 text-gray-400" name="age">
              <option selected>Select Age group</option>
              <option value="18-25">18 - 25</option>
              <option value="26-35">26 - 35</option>
              <option value="36-45">36 - 45</option>
              <option value="45+">45+</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="comments">
            Comments
          </label>
          <textarea onChange={handleChange} rows="1" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Write your thoughts here..." name="comments"></textarea>
        </div>
        <div>
          <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="password">
            Password
          </label>
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name='password' type={showpassword} placeholder='********' onChange={handleChange} noValidate />
          <span className='text-red-700 text-sm'>{error.password}</span>
          <div class="flex">
            <input type="checkbox" name='checkbox' onClick={() => handleShowPassword()} />
            <p class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4 ml-2">
              show password
            </p>
          </div>
        </div>
        <button class="bg-purple-400 hover:bg-purple-500 text-white font-semibold hover:text-white py-2 px-4 border border-purple-400 hover:border-transparent rounded" type="submit">
          Submit
        </button>
      </form> :
        <div className="w-full max-w-sm flex flex-col m-auto min-h-screen justify-center">
          <p className="text-2xl mb-4">Thank you for submitting the form!</p>
          <button class="underline" onClick={() => { setShowmessage(true) }}>
            Fill another response
          </button>
        </div>}
    </div>
  );
}

export default App;
