
  'use server';

import { loginAction } from "../actions/login";


const loginPage = () => {
  return (
    <>
      <form action={loginAction} className="p-4 space-y-4">
        <select name="role" className="border p-2">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </>
  );
};

export default loginPage;