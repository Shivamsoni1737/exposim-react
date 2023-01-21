import { useState } from 'react';
import './App.css';

function App() {
  const [formstate, setFormState] = useState({
    fullName: null,
    email: null,
    phone: 0,
    password: null,
    errors: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      gender: '',
    }
  });

  const [showpassword, setShowpassword] = useState('password');
  const [showmessage, setShowmessage] = useState(true);


  const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = formstate.errors;
    console.log(`${name} ${value} `);
    console.log(formstate.errors);

    switch (name) {
      case 'fullName':
        errors.fullName =
          value.length < 1
            ? 'Please enter your name'
            : '';
        break;
      case 'email':
        errors.email =
          !!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'phone':
        errors.phone =
          value.length === 10
            ? ''
            : 'enter correct phone number!'
        break;
      case 'password':
        errors.password =
          value.length < 8
            ? 'Password must be at least 8 characters long!'
            : '';
        break;
      default:
        break;
    }
    console.log(formstate)

    setFormState({ errors, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formstate)
    if (validateForm(formstate.errors)) {
      console.info('Valid Form')
      setShowmessage(false);
    } else {
      console.error('Invalid Form')
    }
  }

  const handleShowPassword = () => {
    if (showpassword === "password") {
      setShowpassword("text");
    } else {
      setShowpassword("password");
    }
  }

  console.log(showmessage)

  return (
    <>
      {showmessage ? <form class="w-full max-w-sm flex flex-col m-auto min-h-screen justify-center" onSubmit={handleSubmit} noValidate>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="fullName">
              Name
            </label>
          </div>
          <div class="md:w-2/3">
            {/* {!name && <p>Please enter the name</p>} */}
            <input class="form-control bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder='Your name' name='fullName' onChange={handleChange} noValidate />
            {formstate.errors.fullName &&
              <span className='error text-red-700 text-sm'>{formstate.errors.fullName}</span>}
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="email">
              Email
            </label>
          </div>
          <div class="md:w-2/3">
            <input pattern={'/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i'} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name='email' type="email" placeholder='email@gmail.com' onChange={handleChange} noValidate />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="phone">
              Phone
            </label>
          </div>
          <div class="md:w-2/3">
            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder='0987654321' name="phone" type="number" onChange={handleChange} noValidate />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="gender">
              Gender
            </label>
          </div>
          <div class="md:w-2/3 md:flex justify-center gap-6">
            <div className="flex items-center pl-4">
              <input id="male" type="radio" name="radio" onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500" />
              <label for="male" className="w-full py-4 ml-2 text-sm font-medium text-gray-900">Male</label>
            </div>
            <div className="flex items-center pl-4">
              <input id="female" type="radio" value="" name="radio" onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500" />
              <label for="female" className="w-full py-4 ml-2 text-sm font-medium text-gray-900">Female</label>
            </div>
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="age">
              Age
            </label>
          </div>
          <div class="md:w-2/3">
            <select class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:bg-white focus:border-purple-500 block w-full p-2.5" name="age">
              <option selected>Select Age group</option>
              <option value="18-25">18 - 25</option>
              <option value="26-35">26 - 35</option>
              <option value="36-45">36 - 45</option>
              <option value="45+">45+</option>
            </select>
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="comments">
              Comments
            </label>
          </div>
          <div class="md:w-2/3">
            <textarea rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Write your thoughts here..." name="comments"></textarea>
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="password">
              Password
            </label>
          </div>
          <div class="md:w-2/3">
            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name='password' type={showpassword} placeholder='********' onChange={handleChange} noValidate />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            {/* <label class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" for="password">
              Password
            </label> */}
          </div>
          <div class="md:w-2/3 flex">
            <input type="checkbox" name='checkbox' onClick={() => handleShowPassword()} />
            <p class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4 ml-2">
              show password
            </p>
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form> :
        <div className="w-full max-w-sm flex flex-col m-auto min-h-screen justify-center">
          <p className="text-2xl mb-4">Thank you for submitting the form!</p>
          <button class="underline" onClick={() => { setShowmessage(true) }}>
            Fill another response
          </button>
        </div>}
    </>
  );
}

export default App;
