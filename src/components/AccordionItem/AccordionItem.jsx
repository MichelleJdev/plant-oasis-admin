import { BiChevronDown } from "react-icons/bi";
import "./AccordionItem.css";

function AccordionItem({ title, children, showContent, toggleShowContent }) {
  return (
    <div className={`AccordionItem ${showContent ? "show" : ""}`}>
      <div className="accordion-title" onClick={toggleShowContent}>
        <BiChevronDown />
        {title}
      </div>

      {children}
    </div>
  );
}

export default AccordionItem;
