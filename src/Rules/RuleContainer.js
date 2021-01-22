import React, { useState, useEffect } from 'react'
import RuleForm from './RuleForm'

const Rules = () => {
    const [rules, setRules] = useState([]);
    const [showRuleForm, setShowRuleForm] = useState(false);

    useEffect(() => {
        updateRules();
        // setTimeout(() => {
        //     const rules = localStorage.getItem('rules');
        //     if (rules) {
        //         setRules(JSON.parse(rules));
        //     }
        // }, 100);

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
        console.log(rules);
        // localStorage.removeItem('rules')
        // localStorage.setItem('rules', JSON.stringify(rules));
    }, [rules]);

    return (
        <div>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Rule</a>
                    <a className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Rulebook</a>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent" style={{ maxWidth: '500px' }}>
                <div className="tab-pane fade show active card" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <RuleForm updateRules={updateRules} />
                    {rules.length === 0 && <h5 className="py-5 bg-light font-weight-bold">No rules found</h5>}
                    {rules.length > 0 && <div className="accordion p-5" id="accordionFlushExample">
                        {rules.map(
                            (rule, index) => {
                                return <div key={index} className="accordion-item">
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
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
            </div>
        </div>
    )
}

export default Rules
