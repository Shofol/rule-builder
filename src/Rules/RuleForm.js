import React, { Fragment, useState, useEffect } from 'react'
import { Formik, Field, FieldArray } from 'formik';

const RuleForm = ({ updateRules }) => {

    const [rules, setRules] = useState([]);
    const [showRuleForm, setShowRuleForm] = useState(false);

    useEffect(() => {
        const rules = localStorage.getItem('rules');
        if (rules) {
            setRules(JSON.parse(rules));
        }
    }, []);

    useEffect(() => {
        localStorage.removeItem('rules')
        localStorage.setItem('rules', JSON.stringify(rules));
        updateRules();
    }, [rules]);

    // const addRule = () => {
    //     rules.push(
    //         {
    //             id: rules.length + 1,
    //             name: '',
    //             description: '',
    //             cause: '',
    //             effects: []
    //         }
    //     )
    // }

    return (
        <div className="px-5 pt-5 d-flex flex-column align-items-start" >
            <div className="d-flex justify-content-between align-items-center mb-3" style={{ width: '100%' }}>
                <h5>Rules</h5>
                <button className="btn btn-primary" onClick={() => setShowRuleForm(true)}>Create a new rule</button>
            </div>
            {showRuleForm && <Formik
                initialValues={{
                    name: '',
                    description: '',
                    when: '',
                    effects: ['']
                }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    }

                    if (!values.description) {
                        errors.description = 'Required';
                    }

                    if (!values.when) {
                        errors.when = 'Required';
                    }

                    // else if (
                    //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    // ) {
                    //     errors.email = 'Invalid email address';
                    // }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setRules([...rules, values])
                        // alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        setShowRuleForm(false);
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
                    isSubmitting,
                    /* and other goodies */
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
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                        />
                        {errors.description && touched.description && errors.description}
                        <label htmlFor="when" className="form-label mt-2">When</label>
                        <input
                            type="text"
                            name="when"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.when}
                        />
                        {errors.when && touched.when && errors.when}
                        <FieldArray
                            name="effects"
                            render={arrayHelpers => (
                                <div style={{ width: '100%' }}>
                                    {values.effects && values.effects.length > 0 ? (
                                        values.effects.map((effect, index) => (
                                            <Fragment key={index}>
                                                <label htmlFor={`effects.${index}`} className="form-label mt-2">Then</label>

                                                <div className="d-flex">
                                                    <Field name={`effects.${index}`} className="form-control"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger mx-1"
                                                        onClick={() => arrayHelpers.remove(index)} // remove a effect from the list
                                                    >
                                                        -
                                                </button>
                                                    <button
                                                        type="button"
                                                        className="btn  btn-outline-primary"
                                                        onClick={() => arrayHelpers.push('')} // insert an empty string at a position
                                                    >
                                                        +
                                                 </button>
                                                </div>
                                            </Fragment>
                                        ))
                                    ) : (
                                            <button type="button" onClick={() => arrayHelpers.push('')}>
                                                {/* show this when user has removed all effects from the list */}
                                             Add a effect
                                            </button>
                                        )}
                                    {/* <div>
                                            <button type="submit">Apply</button>
                                        </div> */}
                                </div>
                            )}
                        />

                        <div className="d-grid gap-2 d-md-flex justify-content-between mt-4" style={{ width: '100%' }}>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowRuleForm(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-success px-5" disabled={isSubmitting}>
                                Apply
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
            }</div>
    )
}

export default RuleForm
