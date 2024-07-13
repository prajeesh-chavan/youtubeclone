import React, { useState } from "react";
import PropTypes from "prop-types";

const ReadMore = ({ id, text, amountOfWords = 15 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const splittedText = text.split(" ");
  const itCanOverflow = splittedText.length > amountOfWords;
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(" ")
    : text;
  const endText = splittedText.slice(amountOfWords - 1).join(" ");

  const handleKeyboard = (e) => {
    if (e.code === "Space" || e.code === "Enter") {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <p id={id}>
      {beginText}
      {itCanOverflow && (
        <>
          {!isExpanded && <span>...</span>}
          <span
            className={`${!isExpanded ? "hidden" : ""}`}
            aria-hidden={!isExpanded}
          >
            {endText}
          </span>
          <span
            className="text-stone-900 font-semibold cursor-pointer"
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={id}
            aria-label={isExpanded ? "show less content" : "show more content"}
            onKeyDown={handleKeyboard}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <div className="block mt-2">Show less</div>
            ) : (
              " more"
            )}
          </span>
        </>
      )}
    </p>
  );
};

ReadMore.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  amountOfWords: PropTypes.number,
};

export default ReadMore;
