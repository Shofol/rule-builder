import React, { useState, useEffect } from 'react'
import { Formik, Field } from 'formik';

const RulebookForm = ({ updateRuleBooks, showRules, showRuleBooks, ruleBooksFromContainer, selectedRule, selectedRuleBook, clearSelection }) => {

    const [ruleBooks, setRuleBooks] = useState(ruleBooksFromContainer);
    const [showRuleForm, setShowRuleForm] = useState(false);
    const [currentRuleBook, setCurrentRuleBook] = useState(null)
    const [currentRuleBookRules, setCurrentRuleBookRules] = useState(selectedRuleBook ? selectedRuleBook.rules : [])

    useEffect(() => {
        localStorage.removeItem('ruleBooks')
        localStorage.setItem('ruleBooks', JSON.stringify(ruleBooks));
        updateRuleBooks();
    }, [ruleBooks]);

    useEffect(() => {
        if (selectedRule) {
            if (!(currentRuleBookRules.filter(rule => JSON.stringify(rule) === selectedRule).length > 0)) {
                setCurrentRuleBookRules([...currentRuleBookRules, JSON.parse(selectedRule)]);
            }
            clearSelection();
        }
    }, [selectedRule]);

    const removeCurrentRule = (index) => {
        console.log('removing');
        const tempRules = [...currentRuleBookRules];
        tempRules.splice(index, 1);
        setCurrentRuleBookRules(tempRules);
    }

    const saveRuleBook = () => {
        if (selectedRuleBook) {
            const tempRuleBooks = [...ruleBooks];
            const updatedRuleBook = currentRuleBook;
            updatedRuleBook.rules = currentRuleBookRules;
            Object.assign(tempRuleBooks.filter(ruleBook => ruleBook.id === selectedRuleBook.id)[0], updatedRuleBook);
            setRuleBooks(tempRuleBooks);
        } else {
            const newRuleBook = currentRuleBook;
            newRuleBook.id = ruleBooks.length === 0 ? 1 : ruleBooks.length + 1;
            newRuleBook.rules = currentRuleBookRules;
            setRuleBooks([...ruleBooks, newRuleBook]);
        }

        showRuleBooks();
    }

    return (
        <div className="card p-5 m-5 ">
            <h3 className="text-start mb-4">New Rulebook</h3>
            {!showRuleForm && <Formik
                initialValues={{
                    name: selectedRuleBook ? selectedRuleBook.name : '',
                    description: selectedRuleBook ? selectedRuleBook.description : '',
                    // when: '',
                    // effects: ['']
                }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    }

                    if (!values.description) {
                        errors.description = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setCurrentRuleBook(values);
                        setShowRuleForm(true);
                        showRules();
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form className="d-flex flex-column align-items-start" onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <label htmlFor="name" className="form-label mt-2 text-left">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {errors.name && touched.name && errors.name}
                        <label htmlFor="description" className="form-label mt-2">Description</label>
                        <textarea
                            type="text"
                            name="description"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                        />
                        {errors.description && touched.description && errors.description}
                        {/* <label htmlFor="when" className="form-label mt-2">When</label>
                        <input
                            type="text"
                            name="when"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.when}
                        />
                        {errors.when && touched.when && errors.when} */}

                        <button type="submit" className="btn btn-success px-5 mt-4 ms-auto" disabled={isSubmitting}>
                            <span>{!selectedRuleBook ? 'Create' : 'Update'}</span> Rulebook
                        </button>
                    </form>
                )}</Formik>}
            {showRuleForm && <div className="text-start"> <h5>{currentRuleBook.name}</h5>
                {currentRuleBookRules.length === 0 &&
                    <div className="py-5 bg-light font-weight-bold text-center"> <h5 >No rules added</h5>
                        <p>Add a rule by dragging and dropping from rules tab</p>
                    </div>}
                {currentRuleBookRules.length > 0 && <div>
                    <h6 className="mt-4">Rules</h6>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRuleBookRules.map(
                                (rule, index) => {
                                    return <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{rule.name}</td>
                                        <td>{rule.description}</td>
                                        <td><button className="btn btn-outline-secondary btn-sm"
                                            onClick={() => { removeCurrentRule(index) }}>Remove</button></td>
                                    </tr>

                                }
                            )}
                        </tbody>
                    </table>
                    <button type="submit" className="btn btn-success px-5 mt-4 ms-auto" onClick={saveRuleBook}>
                        Save Rulebook
                        </button>
                </div>
                }
            </div>
            }
        </div>
    )
}

export default RulebookForm
