import React from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./slider.css";

const Slider = () => {
    const characters = useSelector(state => state.attendance.rows);
    const backup = useSelector(state => state.attendance.backup);
    // Setting state variables for current character index and current character object
    const [index, setIndex] = useState(0);
    const character = characters[index];

    // Helper function to check if the character index is within bounds
    const checkCharacterNumber = (characterIndex) => {
        if (characterIndex < 0) {
            // If the index is less than 0, set it to the last character
            return characters.length - 1;
        } else if (characterIndex > characters.length - 1) {
            // If the index is greater than the number of characters, set it to the first character
            return 0;
        } else {
            // Otherwise, return the index as is
            return characterIndex;
        }
    };
    // function to go to the next character
    const nextCharacter = () => {
        setIndex((index) => {
            const newIndex = index + 1
            return checkCharacterNumber(newIndex)
        })
    }

    // function to go to the previous character
    const previousCharacter = () => {
        setIndex((index) => {
            const newIndex = index - 1
            return checkCharacterNumber(newIndex)
        })
    }

    return (
        <div data-testid={'teacherSlider'} className={`one-character ${character.house?.toLowerCase()}`}>
            {/* Character image */}
            <img data-testid={'image'} src={character.image} alt="" />
            {/* Character name */}
            <h2 data-testid={'name'} className="character-name">{character.teacher}</h2>
            {/* Character house */}
            <p data-testid={'house'}>House: {character.house}</p>
            {/* Character presence information */}
            <p data-testid={'status'}>
                Status: {character.attendance}
            </p>
            {/* Character backup */}
            {character.attendance !== 'Present' && <p data-testid={'backup'}>Backup: {backup[character.teacher]}</p>}
            {/* Button to go to previous character */}
            <button data-testid={'prev'} onClick={previousCharacter}>
                <FaArrowAltCircleLeft />
            </button>
            {/* Button to go to next character */}
            <button data-testid={'next'} onClick={nextCharacter}>
                <FaArrowAltCircleRight />
            </button>
        </div>

    );

};


export default Slider;