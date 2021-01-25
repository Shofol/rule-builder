import React, { useState, useEffect } from 'react';


const List = ({ renderPipeline }) => {
    const [pipelineList, setPipelineList] = useState([]);

    useEffect(() => {
        let existingList = localStorage.getItem('pipelineList');
        if (existingList) {
            setPipelineList(JSON.parse(existingList));
        }
    }, []);

    useEffect(() => {
        console.log(pipelineList)
    }, [pipelineList]);


    return (
        <div className="dndflow me-3" style={{ maxWidth: '250px' }}>
            <h5 className="text-start ps-3 mb-3">List of pipelines. Click on pipelines to see them.</h5>

            <aside className="dndflow" style={{ display: 'flex', flexDirection: 'column' }}>
                {pipelineList.map(
                    (pipeline, i) => {
                        return <button className="btn btn-warning btn-sm mb-3" key={i} onClick={() => renderPipeline(pipeline, i)} >
                            {pipeline.name ? pipeline.name : `Pipeline${i + 1}`}</button>
                    }
                )}
            </aside>
        </div>
    )
}

export default List
