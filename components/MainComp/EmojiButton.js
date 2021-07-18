import { useState } from "react";
import { usePopper } from "react-popper";
import { Popover } from "@headlessui/react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const EmojiButton = ({chosenEmoji, setChosenEmoji}) => {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement);
  return (
    <>
      <Popover className="relative">
        <Popover.Button ref={setReferenceElement}>
          <div className="flex font-semibold align-items text-sm text-gray-500 my-2 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100">
            <span className="pr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            Add icon
          </div>
        </Popover.Button>
        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
         {!chosenEmoji && <Picker set="apple" onSelect={(emoji)=> setChosenEmoji(emoji)}/>}
        </Popover.Panel>
      </Popover>
    </>
  );
};

export default EmojiButton;
