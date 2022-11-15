import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubActions";

function UserSearch() {
   const [text, setText] = useState("");
   const { users, clearUsers, dispatch } = useContext(GithubContext);
   const { setAlert } = useContext(AlertContext);

   const handleChange = (e) => {
      setText(e.target.value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (text === "") {
         setAlert("Field cannot be empty", "error");
      } else {
         dispatch({ type: "SET_LOADING" });
         const users = await searchUsers(text);
         dispatch({ type: "GET_USERS", payload: users });
         setText("");
      }
   };

   return (
      <div className="grid grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 mb-8 gap-8 mx-auto">
         <div>
            <form onSubmit={handleSubmit}>
               <div className="form-control">
                  <div className="relative">
                     <input
                        type="text"
                        className="w-full pr-40 bg-gray-200 input input-lg text-black"
                        placeholder="Search..."
                        value={text}
                        onChange={handleChange}
                     />
                     <button
                        className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                        type="submit"
                     >
                        Go
                     </button>
                  </div>
               </div>
            </form>
         </div>
         {users.length > 0 ? (
            <div>
               <button onClick={clearUsers} className="btn btn-ghost btn-lg">
                  Clear
               </button>
            </div>
         ) : null}
      </div>
   );
}
export default UserSearch;
