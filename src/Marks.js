import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './marks.css';  // Import the CSS file for styles
import Ent from './components/Ent';
import Bst from './components/Bst';

const Marks = () => {
    // let id=props.id
    const navigate = useNavigate();
    

    const usenavi = (path) => {
        navigate(path);
    };

    return (
        <div className="marks__container">
            <div className="marks__box marks__box--ent" onClick={() => usenavi("/marks/ent")}>
                <span>ENT</span>
               
            </div>
            <div className="marks__box marks__box--bst" onClick={() => usenavi("/marks/bst")}>
                <span>BST</span>
            </div>
            <div className="marks__box marks__box--ict" onClick={() => usenavi("/marks/ict")}>
                <span>ICT</span>
            </div>
               
        </div>

    );
}

export default Marks;
