import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

export default () => {
    const onDragStart = (event, node) => {
        event.dataTransfer.setData('application/nodeType', node.type);
        event.dataTransfer.setData('application/label', node.label);
        event.dataTransfer.setData('application/props', JSON.stringify(node.props));
        event.dataTransfer.effectAllowed = 'move';
    };

    const [ruleBooks, setRuleBooks] = useState([]);



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
        console.log(ruleBooks.map(ruleBook => ruleBook.name));
    }, [ruleBooks]);

    return (
        <aside className="dndflow">
            <div className="description text-start" style={{ marginBottom: '20px' }}>You can drag these nodes to the pane on the right.</div>
            <Accordion allowZeroExpanded>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Source
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className="dndnode"
                            onDragStart={(event) => onDragStart(event, {
                                type: 'default', label: 'CSV File Scan',
                                props: [
                                    { label: 'fileUrl', type: 'file', value: undefined },
                                    { label: 'delimeter', type: 'text', value: undefined }]
                            })} draggable>
                            CSV File Scan
                        </div>
                    </AccordionItemPanel>
                    <AccordionItemPanel>
                        <div className="dndnode"
                            onDragStart={(event) => onDragStart(event, {
                                type: 'default', label: 'MySQL Source',
                                props: [
                                    { label: 'host', type: 'text', value: undefined },
                                    { label: 'port', type: 'text', value: undefined },
                                    { label: 'table', type: 'text', value: undefined },
                                    { label: 'username', type: 'text', value: undefined },
                                    { label: 'password', type: 'text', value: undefined },
                                ]
                            })} draggable>
                            MySQL Source
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>

            </Accordion>

            <Accordion allowZeroExpanded>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Utilities
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className="dndnode"
                            onDragStart={(event) => onDragStart(event, {
                                type: 'default', label: 'Aggregete',
                                props: [{ label: 'Cast Type', type: 'dropdown', value: null, options: ['string', 'integer', 'double', 'boolean'] }]
                            })} draggable>
                            Aggregete
                        </div>
                    </AccordionItemPanel>
                    <AccordionItemPanel>
                        <div className="dndnode"
                            onDragStart={(event) => onDragStart(event, {
                                type: 'default', label: 'Reservoir Sampling',
                                props: [
                                    { label: 'Number of Sampling', type: 'text', value: undefined },
                                ]
                            })} draggable>
                            Reservoir Sampling
                        </div>
                    </AccordionItemPanel>


                </AccordionItem>
            </Accordion>

            <Accordion allowZeroExpanded>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Analytics
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className="dndnode"
                            onDragStart={(event) => onDragStart(event, {
                                type: 'default', label: 'Sentiment Analytics', props: [{ label: 'Attribute', type: 'boolean', value: false }]
                            })} draggable>
                            Sentiment Analytics
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>

            <Accordion allowZeroExpanded>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            User Defined Functions With Python UDF
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className="dndnode"
                            onDragStart={(event) => onDragStart(event, {
                                type: 'default', label: 'Python UDF',
                                props: [{ label: 'Python Script File', type: 'file', value: undefined }]
                            })} draggable>
                            Python UDF
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>


            <Accordion allowZeroExpanded>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Rulebook
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className="dndnode"
                            onDragStart={(event) => onDragStart(event, {
                                type: 'default', label: 'Rulebook',
                                props: [
                                    { label: 'Label', type: 'text', value: undefined },
                                    { label: 'Address', type: 'text', value: undefined },
                                    { label: 'Rulebooks', type: 'dropdown', value: null, options: ruleBooks.map(ruleBook => ruleBook.name) },
                                    { label: 'Rulebooks JSON', type: 'textarea', disabled: true, value: JSON.stringify(ruleBooks) }
                                ]
                            })} draggable>
                            Rulebook
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>



        </aside>

    );
};