import { Popover, Switch } from "@headlessui/react";
import { useState, useContext, useEffect } from "react";
import { usePopper } from "react-popper";
import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase";
function MyDropdown() {
  const { user } = useContext(UserContext);
  const { auth } = useContext(FirebaseContext);
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement);
  const [enabled, setEnabled] = useState(false);
  function handleLogout() {
    auth.signOut();
  }
  function handleDark(){
      setEnabled((enabled)=> !enabled)
      if (enabled) {
        localStorage.theme = 'light'
      } 

      else {
        localStorage.theme = 'dark' 
         
      }
  }
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        setEnabled(true)
      } else {
        document.documentElement.classList.remove('dark')
      }
  }, [enabled])
  return (
    <Popover className="relative">
      <Popover.Button ref={setReferenceElement} className="focus:outline-none focus:shadow-outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </Popover.Button>

      <Popover.Panel
        className="px-5 pt-2 w-56"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-0">
          <div className="relative grid gap-6 p-7 bg-red-50 dark:bg-gray-800">
              {user &&
            <button
              onClick={() => handleLogout()}
              className="w-full rounded-full h-12 hover:bg-red-100 dark:hover:bg-gray-600"
            >
              <span className="flex align-items px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="pl-2">Logout</span>
              </span>
            </button>}
            <Switch.Group className=" flex px-3">
              <div className="flex items-center">
                <Switch.Label className="pr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </Switch.Label>
                <Switch
                  checked={enabled}
                  onChange={()=>handleDark()}
                  className={`${
                    enabled ? "bg-purple-800" : "bg-blue-100"
                  } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                >
                  <span
                    className={`${
                      enabled ? "translate-x-6" : "translate-x-1"
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
              </div>
            </Switch.Group>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export default MyDropdown;
