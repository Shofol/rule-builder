import React, { useState, useEffect, useRef } from 'react'
import RulebookForm from './RulebookForm';
import RuleForm from './RuleForm'

const Rules = () => {
    const [rules, setRules] = useState([]);
    const [showRuleForm, setShowRuleForm] = useState(false);

    const [ruleBooks, setRuleBooks] = useState([]);
    const ruleTabRef = useRef(null);
    const ruleBookTabRef = useRef(null);

    const [showRuleBookForm, setShowRuleBookForm] = useState(false);
    const [selectedRule, setSelectedRule] = useState(null)
    const [selectedRuleBook, setSelectedRuleBook] = useState(null)

    useEffect(() => {
        updateRules();
    }, []);

    const updateRules = () => {
        setTimeout(() => {
            const rules = localStorage.getItem('rules');
            if (rules) {
                setRules(JSON.parse(rules));
            }
        }, 100);
    }

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

    useEffect(() => {
        console.log(rules);
        // localStorage.removeItem('rules')
        // localStorage.setItem('rules', JSON.stringify(rules));
    }, [rules]);

    const onRuleDragstart = (ev, rule) => {
        ev.dataTransfer.setData("rule", JSON.stringify(rule));
    }

    const drop = (ev) => {
        ev.preventDefault();
        // var data = ev.dataTransfer.getData("text");
        setSelectedRule(ev.dataTransfer.getData("rule"))
    }

    const handleRuleBookEdit = (ruleBook) => {
        setSelectedRuleBook(ruleBook);
        setShowRuleBookForm(true);
    }

    const removeRuleBook = (index) => {
        const tempRuleBooks = [...ruleBooks];
        tempRuleBooks.splice(index, 1);
        localStorage.removeItem('ruleBooks')
        localStorage.setItem('ruleBooks', JSON.stringify(tempRuleBooks));
        setRuleBooks(tempRuleBooks);
    }


    return (
        <div className="row">
            <div className="col-3">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist" style={{ borderRight: '1px solid #DFDFDF' }}>
                        <a className="nav-link active" ref={ruleTabRef} id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Rule</a>
                        <a className="nav-link" ref={ruleBookTabRef} id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Rulebook</a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent" >
                    <div className="tab-pane fade show active card" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" style={{ minHeight: '88.5vh' }}>
                        <RuleForm updateRules={updateRules} />
                        {rules.length === 0 && <h5 className="py-5 bg-light font-weight-bold">No rules found</h5>}
                        {rules.length > 0 && <div className="accordion p-5" id="accordionFlushExample">
                            {rules.map(
                                (rule, index) => {
                                    return <div key={index} className="accordion-item"
                                        draggable="true" onDragStart={(ev) => onRuleDragstart(ev, rule)}
                                        onDragOver={(event) => event.preventDefault()}>
                                        <h2 className="accordion-header" id="flush-headingOne">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls={`flush-collapse${index}`}>
                                                {rule.name}
                                            </button>
                                        </h2>
                                        <div id={`flush-collapse${index}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body">
                                                Description: {rule.description}
                                            When: {rule.when}
                                            Effects:
                                            {
                                                    rule.effects.map(
                                                        effect => {
                                                            return <span>{effect}</span>
                                                        }
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                            )}
                        </div>}
                    </div>
                    <div className="tab-pane fade card p-5" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" style={{ minHeight: '88.5vh' }}>
                        <input type="text" className="form-control" placeholder="Search a rulebook"></input>
                        {ruleBooks.length === 0 && <h5 className="py-5 bg-light font-weight-bold mt-4">No rulebooks found</h5>}
                        <button className="btn btn-primary mt-4" onClick={() => setShowRuleBookForm(true)}>Create a rulebook</button>

                        {ruleBooks.length > 0 && <div className="accordion py-5" id="ruleBookAccordion">
                            {ruleBooks.map(
                                (ruleBook, index) => {
                                    return <div key={index} className="accordion-item">
                                        <h2 className="accordion-header" id="flush-headingOne">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls={`flush-collapse${index}`}>
                                                {ruleBook.name}
                                            </button>
                                        </h2>
                                        <div id={`flush-collapse${index}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#ruleBookAccordion">
                                            <div className="accordion-body">
                                                Description: {ruleBook.description}
                                                <div>
                                                    <button className="btn btn-sm btn-primary mr-1" onClick={() => handleRuleBookEdit(ruleBook)}>Edit</button>
                                                    <button className="btn btn-sm btn-secondary ml-1" onClick={() => removeRuleBook(index)}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            )}
                        </div>}
                    </div>
                </div>
            </div>
            <div className="col-9" onDrop={drop} onDragOver={(event) => event.preventDefault()}>
                {showRuleBookForm &&
                    <div >
                        <RulebookForm updateRuleBooks={() => { updateRuleBooks() }}
                            selectedRule={selectedRule}
                            selectedRuleBook={selectedRuleBook}
                            showRuleForm={showRuleForm} ruleBooksFromContainer={ruleBooks}
                            showRules={() => { ruleTabRef.current.click() }}
                            showRuleBooks={() => {
                                ruleBookTabRef.current.click(); setTimeout(() => {
                                    setShowRuleBookForm(false);
                                    setSelectedRule(null)
                                }, 100);
                            }} /></div>
                }
            </div>
        </div>
    )
}

export default Rules
