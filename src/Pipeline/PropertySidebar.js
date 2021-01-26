import React, { useState, useEffect } from 'react';

export default ({ propList, updateProp, download }) => {


    const [ruleBooks, setRuleBooks] = useState([]);
    const [ruleBookValue, setRuleBookValue] = useState(undefined);

    useEffect(() => {
        updateRuleBooks();
    }, []);

    const updateRuleBooks = () => {
        setTimeout(() => {
            const ruleBooks = localStorage.getItem('ruleBooks');
            if (ruleBooks) {
                setRuleBooks(JSON.parse(ruleBooks));
            }
        }, 100);
    }

    const [updatedPropList, setUpdatedPropList] = useState(propList);
    const handleChange = (value, label) => {
        const tempPropList = [...propList];
        tempPropList.filter(prop => prop.label === label)[0].value = value;
        setUpdatedPropList(tempPropList);

        // if (showTextArea) {
        //     const newValue = JSON.stringify(ruleBooks.filter(ruleBook => ruleBook.name === value)[0]);
        //     setRuleBookValue(newValue);
        // }
    }

    useEffect(() => {
        setUpdatedPropList(propList);
    }, [propList]);

    useEffect(() => {
        const value = updatedPropList.filter(el => el.showTextArea === true)[0].value;
        if (value) {
            const newValue = JSON.stringify(ruleBooks.filter(ruleBook => ruleBook.name === value)[0]);
            setRuleBookValue(newValue);
        }
    }, [updatedPropList, ruleBooks]);


    return (
        <aside className="dndflow" style={{ minWidth: '250px', position: 'relative' }}>
            <h5 className="text-start ps-3 mb-3">List of properties</h5>
            {
                updatedPropList.map(
                    (prop, index) => {
                        return <div className="mx-3 text-start" key={index}>
                            {prop.type === 'text' && <div className="nodeProp">
                                <label>{prop.label.toUpperCase()}</label>
                                <input defaultValue={prop.value} placeholder={prop.label} onChange={(e) => handleChange(e.target.value, prop.label)}></input>
                            </div>}
                            {prop.type === 'dropdown' && <div className="nodeProp">
                                <label>{prop.label.toUpperCase()}</label>
                                <select value={prop.value ? prop.value : ''} onChange={(e) => handleChange(e.target.value, prop.label)}>
                                    {
                                        prop.options.map(
                                            (option, opInd) => {
                                                return <option key={opInd} value={option}>{option}</option>
                                            }
                                        )
                                    }
                                </select>
                            </div>}
                            {prop.type === 'boolean' && <div className="nodeProp">
                                <label>{prop.label.toUpperCase()}</label>
                                {prop.value}
                                <input type="checkbox" checked={(prop.value === 'false' || prop.value === false) ? false : true} onChange={(e) => handleChange(e.target.checked, prop.label)} />
                            </div>}
                            {prop.type === 'file' && <div className="nodeProp">
                                <label>{prop.label.toUpperCase()}</label>
                                <input type="file" defaultValue={''} onChange={(e) => handleChange(e.target.value, prop.label)} />
                            </div>}
                            {prop.showTextArea === true && <div className="nodeProp">
                                <label>{prop.label.toUpperCase()}</label>
                                <textarea disabled={true} value={ruleBookValue} onChange={(e) => handleChange(e.target.value, prop.label)} />
                            </div>}
                        </div>
                    }
                )
            }
            <button className="btn btn-success btn-sm px-3 mt-4" onClick={() => updateProp(updatedPropList)}>Save Property</button>
        </aside>

    );
};