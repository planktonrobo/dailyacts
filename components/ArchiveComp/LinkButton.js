import { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";

const LinkButton = () => {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement);
  return (
    <Popover>
      <Popover.Button ref={setReferenceElement}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </Popover.Button>

      <Popover.Panel
        className="px-5 pt-5 w-24"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className="relative text-xs">Link Copied!</div>
      </Popover.Panel>
    </Popover>
  );
};

export default LinkButton;
